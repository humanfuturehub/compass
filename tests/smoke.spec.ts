import { expect, test, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

// The seat is created here through the service role, so the test never consumes
// seeded codes and leaves nothing behind (NOTES.md). In CI these come from
// E2E_SUPABASE_URL / E2E_SUPABASE_SERVICE_ROLE_KEY of the preview project.

const url = process.env.E2E_SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.E2E_SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const INSTITUTION = '00000000-0000-4000-8000-000000000001';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const db = createClient(url, key, { auth: { persistSession: false } });
let seatId = '';
let code = '';

const weiter = (page: Page) => page.locator('footer').getByRole('button', { name: 'Weiter' });

// After a server-action redirect the URL changes a moment before the new page
// commits, so wait for the heading to change as well, not just the URL.
async function pressWeiter(page: Page) {
  const before = page.url();
  const heading = await page.locator('main h1').first().innerText();
  await weiter(page).click();
  await page.waitForURL((next) => next.toString() !== before);
  await expect(page.locator('main h1').first()).not.toHaveText(heading);
}

test.beforeAll(async () => {
  code = Array.from({ length: 8 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
  const { data, error } = await db
    .from('seats')
    .insert({ institution_id: INSTITUTION, code, staff_ref: `E2E-${Date.now()}` })
    .select('id')
    .single();
  if (error) throw error;
  seatId = (data as { id: string }).id;
});

test.afterAll(async () => {
  if (seatId) await db.from('seats').delete().eq('id', seatId);
});

test('redeem → complete m1 → wrong then right → close → reopen → correct unit', async ({ browser }) => {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  await page.goto('/');
  await page.fill('#code', code);
  await page.getByRole('button', { name: 'Kurs starten' }).click();
  await expect(page).toHaveURL(/\/fortsetzen$/);
  await expect(page.locator('input[readonly]')).toHaveValue(/\/fortsetzen\?t=/);

  await page.goto('/kurs');
  await expect(page).toHaveURL(/\/kurs\/start\/start-willkommen$/);
  for (let i = 0; i < 4; i++) await pressWeiter(page);
  await expect(page).toHaveURL(/start-einstiegsfragen$/);

  // Pre-assessment: one item per screen, first option each time.
  for (let i = 0; i < 12; i++) {
    await page.locator('fieldset label').first().click();
    await page.getByRole('button', { name: i === 11 ? 'Abschließen' : 'Weiter', exact: true }).first().click();
  }
  await expect(page.getByText('Danke. Deine Antworten sind gespeichert')).toBeVisible();
  await expect(weiter(page)).toBeVisible();
  await pressWeiter(page);
  await expect(page).toHaveURL(/\/uebersicht$/);

  // m1
  await page.goto('/kurs');
  await expect(page).toHaveURL(/m1-muster-statt-wissen$/);
  await pressWeiter(page);
  await pressWeiter(page);
  await expect(page).toHaveURL(/m1-check$/);
  await expect(weiter(page)).toBeEnabled();

  const q1 = page.locator('fieldset').first();
  await q1.locator('label', { hasText: 'Aus einer geprüften Datenbank' }).click();
  await expect(q1.getByText('Nein. Ein Sprachmodell hat keine Faktendatenbank')).toBeVisible();
  await expect(weiter(page)).toBeEnabled();
  await q1.getByRole('button', { name: 'Nochmal versuchen' }).click();
  await q1.locator('label', { hasText: 'Aus Mustern, welche Wörter' }).click();
  await expect(q1.getByText('Genau. Das Modell berechnet')).toBeVisible();

  await expect
    .poll(async () => {
      const { data: learner } = await db.from('learners').select('id').eq('seat_id', seatId).single();
      const { data } = await db
        .from('check_attempts')
        .select('option_id, is_correct, attempt_no')
        .eq('learner_id', (learner as { id: string }).id)
        .eq('question_id', 'm1-check-q1')
        .order('attempt_no');
      return data;
    })
    .toEqual([
      { option_id: 'a', is_correct: false, attempt_no: 1 },
      { option_id: 'c', is_correct: true, attempt_no: 2 },
    ]);
  await expect(page.locator('main')).not.toContainText(/Punkte|%/);

  await pressWeiter(page);
  await expect(page).toHaveURL(/\/uebersicht$/);

  // Close, reopen with nothing but the cookie.
  const cookies = await ctx.cookies();
  await ctx.close();
  const ctx2 = await browser.newContext();
  await ctx2.addCookies(cookies);
  const page2 = await ctx2.newPage();
  await page2.goto('/');
  await expect(page2).toHaveURL(/\/kurs\/m2\/m2-halluzination$/);
  await ctx2.close();
});

test('public quiz works with cookies blocked', async ({ browser }) => {
  // Cookies "blocked": the page cannot read or write document.cookie, and the test
  // asserts the server never sends Set-Cookie during the quiz. If neither side
  // touches cookies, blocking them cannot change the outcome.
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(document, 'cookie', { get: () => '', set: () => undefined });
  });
  const setCookieSeen: string[] = [];
  page.on('response', (response) => {
    if (response.headers()['set-cookie']) setCookieSeen.push(response.url());
  });
  const { count: before } = await db.from('public_quiz_runs').select('*', { count: 'exact', head: true });

  await page.goto('/quiz');
  await page.getByRole('button', { name: 'Quiz starten' }).click();
  for (let i = 0; i < 7; i++) {
    await page.locator('fieldset label').nth(1).click();
    await page.getByRole('button', { name: i === 6 ? 'Abschließen' : 'Weiter', exact: true }).click();
  }
  await expect(page.getByText(/\d von 7 richtig/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Mit Zugangscode in den Kurs' })).toHaveAttribute('href', '/');
  expect(setCookieSeen).toEqual([]);
  expect(await ctx.cookies()).toEqual([]);
  await expect
    .poll(async () => (await db.from('public_quiz_runs').select('*', { count: 'exact', head: true })).count)
    .toBe((before ?? 0) + 1);
  await ctx.close();
});
