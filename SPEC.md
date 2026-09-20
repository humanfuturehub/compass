# Compass — Build Specification v1

**For:** Claude Code
**Objective:** A lean, functioning first iteration of the Human Future Hub self-paced AI literacy course. Walkable end to end, correct on the Human Future Hub design system, with no feature built that v1 does not need.

---

## 0. How to work on this build

Work in the eight phases in Section 10, in order. After each phase, run the app and confirm the acceptance criteria for that phase before starting the next. Do not begin Phase N+1 with Phase N failing.

**Rules that hold throughout:**

- Add no dependency outside the allowlist in Section 2. If something seems to need one, implement the small version instead and note it in `NOTES.md`.
- Keep every file under roughly 200 lines. Split by responsibility, not by line count.
- Content is data in the repository. Never hardcode learner-facing German or English strings inside components.
- Every colour, size and spacing value comes from a token. No literal hex values or pixel values in component files.
- German is the source locale. English follows the same schema.
- Do not build anything in Section 9 ("Out of scope"). If a phase seems to require it, the phase is wrong; note it and continue.

---

## 1. What the product is

A self-paced AI literacy course for teachers, parents, and adults entering the German labour market. Learners are issued a seat by their institution, work through a linear path of short units, answer knowledge checks, and receive a certificate.

**Three things define it:**

1. **There is no AI in the product.** No chat, no model calls, no generation. Every AI failure demonstration is a fixed, pre-written transcript stored as content. This is a deliberate product decision and it is also why the data protection position is simple. Do not add a model call anywhere.
2. **Guidance is the feature.** The learner always knows where they are, how much is left, and that they can stop safely. Most of the behaviour specified in Section 6 exists for this reason.
3. **Checks never block.** Knowledge checks are unlimited-attempt, always explained, never scored to the learner, and never gate progression.

**Primary device is a phone.** Roughly 90% of real usage is mobile portrait. Build mobile-first; the only desktop-first surface is the admin dashboard.

---

## 2. Stack and dependencies

| | |
|---|---|
| Framework | Next.js (App Router), TypeScript, React Server Components where natural |
| Styling | Tailwind CSS, configured from the tokens in Section 3 |
| Database | Supabase (PostgreSQL) with Row Level Security |
| Hosting | Vercel, region `fra1`. Supabase project in an EU region. |
| Fonts | `next/font/google` — League Spartan, Public Sans |

**Dependency allowlist.** `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`, `@supabase/supabase-js`, `@supabase/ssr`, `zod`, and as dev dependencies `@playwright/test` and `supabase` (the CLI, used for migrations).

Nothing else. No component library, no icon package (inline SVG only, four icons needed), no date library (use `Intl.DateTimeFormat`), no PDF library (print stylesheet), no i18n library (see Section 7), no analytics SDK, no state management library.

**Environment variables**

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY      # server only, never exposed
SESSION_SECRET                 # HMAC key for seat-code sessions
ADMIN_ACCESS_CODES             # comma-separated, one per institution, v1 only
```

---

## 3. Design system

### 3.1 Tokens

```css
:root {
  /* Brand */
  --hfh-blue:   #1B4A9B;
  --hfh-orange: #FF6D4D;
  --hfh-teal:   #52CBBE;

  /* Derived tints — used as backgrounds behind dark text */
  --hfh-blue-tint:   #EAF0FA;
  --hfh-orange-tint: #FFE9E3;
  --hfh-teal-tint:   #E4F7F5;

  /* Neutrals */
  --ink:          #14161A;
  --ink-muted:    #5A6270;
  --surface:      #FFFFFF;
  --surface-sunken:#F4F5F7;
  --border:       #E3E6EA;

  /* Radius */
  --r-card: 14px;
  --r-btn:  10px;
  --r-pill: 999px;

  /* Elevation — one level only */
  --shadow: 0 1px 2px rgba(20,22,26,0.06);
}
```

**Spacing scale.** 4, 8, 12, 16, 20, 24, 32, 40, 56. Nothing between.

### 3.2 Colour usage rules — read this before styling anything

The brand colours cannot carry text on white at AA contrast. Orange on white is approximately 2.2:1 and teal on white approximately 1.9:1. Both fail. This constrains usage:

| Colour | Use for | Never use for |
|---|---|---|
| Blue `--hfh-blue` | Primary button background with white text, links, focus ring, headings where emphasis is needed | — |
| Orange `--hfh-orange` | A 3px left border or underline. Background of a highlight block, with `--ink` text on top. Small filled badges with `--ink` text. | Body text, link text, button labels on white, any text on a white background |
| Teal `--hfh-teal` | Completed-state indicators, progress dots, small filled badges with `--ink` text | Text on white |

Every tint variable is safe as a background behind `--ink` text.

### 3.3 Typography

League Spartan 600 for headings. Public Sans 400/500/600 for everything else.

| Role | Size / line height | Font |
|---|---|---|
| Display | 28 / 34 | League Spartan 600 |
| H1 | 24 / 30 | League Spartan 600 |
| H2 | 19 / 26 | League Spartan 600 |
| Body | 17 / 27 | Public Sans 400 |
| Body strong | 17 / 27 | Public Sans 600 |
| Small | 15 / 23 | Public Sans 400 |
| Micro | 13 / 18 | Public Sans 500, labels only |

Body is 17px rather than 16 because the reading level target is A2–B1 German. Never go below 15px for anything a learner reads.

### 3.4 Layout

- Learner surfaces: single column, container `max-width: 520px`, horizontal padding 20px, centred.
- Admin: `max-width: 1100px`.
- Minimum tap target 44×44px.
- Page background `--surface`. Cards `--surface-sunken` with no border, or `--surface` with a 1px `--border`. Pick one per component and stay consistent.

### 3.5 Visual prohibitions

No gradients. No glow effects. No neural-network, circuit, brain or robot imagery. No emoji as interface iconography. No more than one shadow level. No animation beyond a 120ms opacity or height transition. No illustrations of AI.

---

## 4. Component inventory

Build these in Phase 1 and use them everywhere. Nine components.

| Component | Spec |
|---|---|
| `Button` | Variants `primary` (blue bg, white text), `secondary` (white bg, 1px border, ink text), `quiet` (text only, blue). Full width on mobile by default. Height 48px. |
| `StepIndicator` | Renders `Modul {n} von {total}`. Micro type, `--ink-muted`. Never a percentage. |
| `UnitDots` | Row of dots for units inside a module. Filled `--hfh-teal` = done, ringed `--hfh-blue` = current, hollow `--border` = not started. 8px dots, 6px gap. Has an `aria-label` describing position in words. |
| `AppHeader` | Sticky. Back control, module title (truncating), `UnitDots`, remaining time as `noch ca. {n} Min.`. Height 56px plus safe-area top inset. |
| `ModuleCard` | Required: `--surface-sunken` fill, title, duration, state indicator. Optional (`Mehr dazu`): white fill with 1px `--border` and 3px `--hfh-orange` left border, visibly subordinate — smaller title, no duration emphasis. Locked: 60% opacity, non-interactive, with a short reason line. |
| `TranscriptCard` | `--surface-sunken` background. A `Aufgezeichnetes Beispiel` micro label at top. Alternating turns labelled `Frage` / `Antwort der KI`. A turn with `highlight: true` gets `--hfh-orange-tint` background and a 3px `--hfh-orange` left border. No input field anywhere in or near this component. |
| `CheckQuestion` | Question, then options as full-width 56px-min buttons. Unselected: white, 1px border. Selected: `--hfh-blue-tint` background, 2px blue border. After selection, the chosen option expands to reveal its explanation. Correct answers show a teal tick, incorrect a neutral grey dash — never a red cross. A `Nochmal versuchen` quiet button appears after any selection. No score anywhere. |
| `ScenarioCard` | Situation text, then three responses presented as equal options with no correct answer. After choosing, all three explanations reveal together, and a line states that reasonable people disagree here. |
| `MerkblattCard` | Title, one-line description, and a `Drucken oder speichern` button that opens the print view. |

Admin adds two: `StatTile` and `DataTable`. Both plain, unstyled beyond the tokens.

---

## 5. Content model

Content lives in `/content/{locale}/` as TypeScript modules. There is no CMS in v1 and none is needed. Validate every content file with `zod` at build time; a schema violation should fail the build, not fail at runtime in front of a learner.

```ts
type Locale = 'de' | 'en';
type Track = 'bewerbung' | 'kinder' | 'unterricht';

type Course = {
  id: string;
  locale: Locale;
  track: Track;
  steps: Step[];               // ordered; this array is the path
};

type Step = {
  id: string;                  // stable, used as a progress key
  kind: 'start' | 'modul' | 'abschluss';
  title: string;               // e.g. "Wo KI Fehler macht"
  estimatedMinutes: number;
  units: Unit[];               // ordered
  extras?: Unit[];             // optional "Mehr dazu" units
};

type Unit =
  | { id: string; type: 'erklaerung';  title: string; body: string[] }
  | { id: string; type: 'transkript';  title: string; intro: string;
      turns: { role: 'user' | 'assistant'; text: string; highlight?: boolean }[];
      points: string[] }
  | { id: string; type: 'wissenscheck'; title: string; questions: Question[] }
  | { id: string; type: 'szenario';    title: string; situation: string;
      responses: { id: string; label: string; text: string; explanation: string }[] }
  | { id: string; type: 'merkblatt';   title: string; summary: string;
      sections: { heading: string; lines: string[] }[] };

type Question = {
  id: string;                  // stable across content edits — item analysis depends on it
  prompt: string;
  options: {
    id: string;
    text: string;
    explanation: string;       // required on EVERY option, correct and incorrect
  }[];
  correctOptionId: string;
};
```

**Content constraints, enforced in the zod schema:**

- `erklaerung.body` paragraphs: 40–90 words each, maximum 3 paragraphs per unit.
- `Question.options`: exactly 3 or 4, every one with a non-empty `explanation`.
- `Step.estimatedMinutes`: 4–12. A step longer than 12 minutes must be split.
- `Unit.id` and `Question.id` must be unique across the course and must never be reused for different content.

### 5.1 Course structure to ship

| Step id | Title (de) | Units to author |
|---|---|---|
| `start` | Los geht's | Orientation (4 `erklaerung`), then the pre-assessment |
| `m1` | Wie KI wirklich funktioniert | 2 `erklaerung`, 1 `wissenscheck` (3 questions). Extras: Tokens, Kontextfenster |
| `m2` | Wo KI Fehler macht | 3 units, one each for Halluzinationen, Gefallsucht, Echokammern. Each is a `transkript` followed by a `wissenscheck` (2 questions). Extras: Wissensstand, Alignment |
| `m3` | Besser fragen mit RACE | 1 `erklaerung`, 1 `wissenscheck` (3 questions) |
| `m4` | KI im Alltag | 1 `szenario`, 1 `merkblatt` |
| `abschluss` | Dein Ergebnis | Post-assessment, then certificate |

Author real German content for `start`, `m1`, `m2` and `abschluss`. For `m3` and `m4`, author one complete unit each as a working schema example and mark the remainder `TODO` in `NOTES.md`. The path must be walkable end to end.

**Assessment.** 12 fixed items, same instrument pre and post, stored in `/content/{locale}/assessment.ts` using the `Question` type. Presented one per screen. No explanations shown during the pre-assessment; explanations shown after the post-assessment.

**Transcript content for `m2`.** Write these as realistic, self-contained failures:

- *Halluzination*: asked when Goethe first flew in an aeroplane, the assistant invents a 1798 flight from Weimar to Frankfurt. Highlight the invented sentence.
- *Gefallsucht*: a user says they are thinking of skipping security testing to ship faster, and the assistant agrees enthusiastically and lists benefits. Highlight the agreeing line.
- *Echokammer*: a user practises a weak interview answer, and the assistant praises it without suggesting an improvement. Highlight the praise.

---

## 6. Behaviour specification

These behaviours are the product. Implement them exactly.

### 6.1 Access, no passwords

There is no email, no password, and no email delivery in v1.

1. An institution is seeded with seat codes: 8 characters, uppercase, unambiguous alphabet (no `O`, `0`, `I`, `1`).
2. The learner opens `/`, enters the code, and is redeemed into a session.
3. Redemption creates a `learner` row bound to that seat, sets `seats.activated_at`, and sets an httpOnly `SameSite=Lax` cookie containing a signed session token (HMAC with `SESSION_SECRET`), expiry 180 days.
4. The learner is also shown a **resume link** at `/fortsetzen?t={signed-token}`, with a copy button and the instruction that they can send it to themselves on WhatsApp. Opening that link on any device restores the session.
5. No personal data is required or requested at any point. The only identifier is the institution's own `staff_ref` on the seat, which the institution sets.

Losing both the cookie and the resume link means asking the partner for a new code. That is an accepted v1 trade-off; note it in `NOTES.md`.

### 6.2 The path is linear

- `steps[]` order is the path. A step is unlocked when the previous step is complete.
- A locked `ModuleCard` shows a short reason: `Zuerst {vorheriger Titel} abschließen`.
- `extras` are never on the path, never required, never counted in completion, and always visually subordinate.
- Deep-linking to a locked unit redirects to the learner's current unit rather than showing an error.

### 6.3 Resume returns to the exact unit

Entering with an existing session goes to the first incomplete unit, not the course home. This single behaviour is responsible for a large share of completion; do not simplify it to a home-screen redirect.

`GET /kurs` resolves the current unit and redirects to `/kurs/{stepId}/{unitId}`.

### 6.4 Stopping is always safe

- Every unit footer contains, below the primary action: `Du kannst hier aufhören. Wir merken uns deinen Platz.`
- Progress writes on unit completion and on `visibilitychange` to hidden. Never rely on an explicit save action.

### 6.5 Progress is counted in steps, not percentages

- `StepIndicator` shows `Modul {n} von {total}` where total counts required steps only.
- `UnitDots` shows position inside the current step.
- No percentage bar anywhere in the learner interface.

### 6.6 Checks never block

- Unlimited attempts.
- Every option reveals its own explanation once selected, whether correct or not.
- No running score, no pass mark, no streak, no celebration animation.
- The primary `Weiter` action is enabled from the moment the unit loads. A learner who skips a question still proceeds.
- Every selection writes a `check_attempt` row including `attempt_no`. First attempts are what item analysis uses.

### 6.7 Time estimates are honest

Display `estimatedMinutes` from content. Record real `time_on_task_s` per unit so estimates can be replaced by measured medians later. Cap recorded time at 3× the estimate to exclude abandoned tabs.

### 6.8 One action per screen

Each learner screen has exactly one primary action. Secondary actions are `quiet` variant. The only exception is the check question, where the options are the interaction.

### 6.9 Certificate

On post-assessment completion, issue a certificate and show `/zertifikat/{id}`.

- A4 portrait, produced with a print stylesheet and `window.print()`. No PDF library.
- Contains: Teilnahmebescheinigung heading, learner display name (free-text, entered at this point, defaulting to the seat's `staff_ref`), course title, list of modules covered, total hours, completion date, Human Future Hub wordmark.
- `@media screen` shows it as a card with a print button. `@media print` hides all chrome.

---

## 7. Localisation

No i18n library. Two mechanisms:

1. **Content** is per-locale files under `/content/{locale}/`.
2. **Interface strings** live in a single `/lib/strings/{locale}.ts` exporting a flat object, accessed through a `t()` helper that takes a key and a locale. Missing keys throw at build time via a TypeScript-derived union of `de` keys.

Locale is resolved from the seat's institution default and stored on the learner. No locale switcher in v1.

Ship `de` complete. Ship `en` for interface strings and the `start` step only; mark the rest `TODO`.

---

## 8. Data model

```sql
institutions       (id, name, locale_default, track, created_at)
seats              (id, institution_id, code, staff_ref, activated_at, created_at)
learners           (id, seat_id, institution_id, locale, display_name, created_at, last_seen_at)
progress           (learner_id, step_id, unit_id, status, time_on_task_s, first_seen_at, completed_at)
check_attempts     (id, learner_id, question_id, option_id, is_correct, attempt_no, created_at)
assessments        (id, learner_id, phase, score, answers jsonb, completed_at)
certificates       (id, learner_id, display_name, hours, modules jsonb, issued_at)
merkblatt_downloads(id, learner_id, merkblatt_id, created_at)
public_quiz_runs   (id, session_hash, score, items_total, created_at)
```

`progress.status` is `started | complete`. Primary key `(learner_id, unit_id)`.

**Row Level Security, on every table.** A learner's session resolves to a `learner_id` server-side; all learner reads and writes go through server actions using that id. Do not expose the service role key to the client. Admin reads are scoped to a single `institution_id` resolved from the admin access code.

**Seed.** A SQL seed creating one institution, 30 seat codes, and one pre-activated demo learner with partial progress, so the app is testable on first run.

---

## 9. Out of scope for v1

Do not build any of these. Each was excluded deliberately.

| | Reason |
|---|---|
| Any model call, chat interface, prompt builder or AI tutor | Core product decision. Adding one changes the data protection position of the entire product. |
| CV or document builders | Year 2, and only with a facilitator present |
| Streaks, badges, points, leaderboards, confetti, avatars | The course teaches people to recognise engagement-optimised design |
| Percentage progress bars | Replaced by step counts, deliberately |
| Email, password auth, magic-link email | Seat codes and resume links replace all of it |
| A CMS or content admin UI | Content is repository files |
| Audio and video | v1.1. Text and transcripts only |
| PDF generation library | Print stylesheet |
| Seat management CRUD in the admin | Seeded via SQL in v1 |
| Analytics SDK | The database is the analytics |
| Dark mode | Not needed, and doubles the contrast review |

---

## 10. Build phases

### Phase 0 — Environments and repository
Everything in Section 12. Repository initialised with `main` protected, `.env.example` committed with no values, `.gitignore` covering `.env.local`. Supabase CLI wired with `supabase/migrations/` and `supabase/seed.sql`, linked to both projects. Vercel project connected with `fra1` pinned, Preview protection enabled, environment variables set separately per environment. CI workflow in place.
**Done when:** `supabase db reset --linked` rebuilds the preview database from migrations plus seed with no manual dashboard steps, a throwaway PR produces a working password-protected preview URL, and CI passes on that PR. Do not start Phase 1 until a database can be rebuilt from the repository alone.

### Phase 1 — Scaffold and design system
Next.js + TypeScript + Tailwind configured from Section 3 tokens. Fonts wired through `next/font`. All nine learner components built and rendered on a `/dev/components` page at 390px width.
**Done when:** every component renders correctly at 390px, no literal hex or px values exist outside the token config, and a contrast check confirms no orange or teal text on white anywhere.

### Phase 2 — Content schema and static rendering
Zod schemas, content loader, `/content/de/` authored per Section 5.1. A temporary route renders any unit by id with no auth and no persistence.
**Done when:** one unit of each of the five types renders correctly from content files, and a deliberate schema violation fails the build.

### Phase 3 — Database and access
Supabase schema, RLS, seed. Seat-code redemption, signed cookie session, `/fortsetzen` resume link with copy button.
**Done when:** a seeded code redeems, the session survives a browser restart, and a resume link opened in a different browser restores the same learner.

### Phase 4 — The path
Course home with `ModuleCard` states, linear gating, `/kurs` resolving to the first incomplete unit, progress writes on completion and on tab hide, unit footer with the stop-here line.
**Done when:** completing a unit advances the dots, closing and reopening returns to the exact next unit, and a locked unit deep-link redirects rather than erroring.

### Phase 5 — Checks
`CheckQuestion` and `ScenarioCard` wired to `check_attempts`, unlimited retries, explanation on every option, `Weiter` always enabled.
**Done when:** a wrong answer shows its explanation and does not block, a retry writes `attempt_no = 2`, and no score appears anywhere.

### Phase 6 — Assessment and certificate
Pre-assessment in `start`, post-assessment in `abschluss`, display-name entry, certificate route with print stylesheet.
**Done when:** both assessments store to `assessments`, the certificate prints to a clean single A4 page in Chrome print preview, and the pre/post delta is computable in SQL.

### Phase 7 — Admin dashboard
`/admin` behind an access code from `ADMIN_ACCESS_CODES`. Four `StatTile`s (seats issued, activated, completed, certificates). A `DataTable` of `staff_ref`, current step, units complete, hours, last active, completion date. Client-side CSV export. An item-analysis table showing first-attempt correct percentage per `question_id`, with any item below 55% flagged.
**Done when:** the table reflects the seeded learner's real progress, CSV opens correctly in Excel with a UTF-8 BOM, and the item-analysis flag appears on a deliberately-failed item.

### Phase 8 — Public quiz and smoke test
`/quiz`, no auth, seven items from `/content/de/quiz.ts`, result screen with a single call to action to enter a seat code. Writes to `public_quiz_runs` with a hashed session identifier and no personal data. One Playwright test covering redeem → complete `m1` → answer a check wrongly then correctly → close → reopen → land on the correct unit.
**Done when:** the Playwright test passes headless and the quiz works with cookies blocked.

---

## 11. Accessibility acceptance criteria

Check before calling v1 done.

- All text meets WCAG AA contrast. Verify orange and teal usage against Section 3.2.
- Every interactive element is reachable and operable by keyboard, with a visible 2px `--hfh-blue` focus ring at 2px offset.
- `UnitDots` and `StepIndicator` expose position in words to screen readers, not only visually.
- Check questions use a radio group with a proper accessible name; explanations are announced on reveal via `aria-live="polite"`.
- Body text is never below 15px and the layout survives 200% browser zoom without horizontal scroll.
- All tap targets at least 44×44px.
- No meaning is carried by colour alone. Completed state has a tick as well as a teal fill.
- `lang` attribute is set from the learner's locale.

---

## 12. Environments, repository and deployment

### 12.1 Ownership

Every account is owned by an organisation with at least two owners, never by an individual. This is a named risk in the programme documentation and it is solved at the account level, not in the code.

| | |
|---|---|
| GitHub | Organisation `humanfuturehub`, repository `compass`, private |
| Vercel | Team account, not a personal account |
| Supabase | Organisation account, two projects (below) |

### 12.2 Environments

One Vercel project, two Supabase projects, both EU Central.

| | Branch | Supabase project | Notes |
|---|---|---|---|
| Production | `main` | `compass-prod` | Region `fra1` pinned in `vercel.json` |
| Preview | every pull request | `compass-preview` | Deployment Protection on, `noindex` until launch |

Supabase region cannot be changed after a project is created. Choose EU Central at creation for both. The data protection position in Section 3 of the programme documentation depends on this.

Preview deployments are the review process. Every pull request produces a URL that must be opened on a real phone before merge. Roughly 90% of real usage is mobile portrait, so desktop review alone is not a review.

### 12.3 Branching

`main` is production and is protected: no direct pushes, one approving review, CI green before merge. Feature branches are short-lived and named `feat/`, `fix/` or `content/`. There is no `develop` branch; for a team of this size it adds a step and prevents nothing.

### 12.4 Migrations

The database is defined by the repository, never by the Supabase dashboard. Schema changed in the dashboard and not captured in a migration is the single most likely way this build becomes unreproducible.

```
/supabase
  /migrations
    0001_schema.sql        # tables from Section 8
    0002_policies.sql      # RLS on every table
    0003_indexes.sql       # progress(learner_id), check_attempts(question_id, attempt_no)
  seed.sql                 # 1 institution, 30 seat codes, 1 demo learner with partial progress
  config.toml
```

Rules: one migration per change, forward-only, never edit a migration that has been applied to production, and always prefix with the next sequential number. `npm run db:reset` must rebuild a database from zero using only these files.

### 12.5 Secrets

No secret is ever committed. `.env.example` is committed with the five variable names from Section 2 and no values. Local development uses a gitignored `.env.local`. Vercel holds the real values, set separately for Production and Preview so the two never share a database.

`SUPABASE_SERVICE_ROLE_KEY` and `SESSION_SECRET` are server-only. Neither may appear in a variable prefixed `NEXT_PUBLIC_`, in client component code, or in anything reaching the browser bundle. Add a build-time check that fails if either string appears in `.next/static`.

### 12.6 CI

One workflow, `.github/workflows/ci.yml`, running on every pull request:

1. `npm ci`
2. `npm run typecheck`
3. `npm run build`
4. `npm run test:e2e` against the preview deployment URL

Nothing else. No lint gates, no coverage thresholds, no release pipeline. For a volunteer team those cost more attention than they return.

### 12.7 Keeping the demo alive

A Supabase project on the free tier pauses after about a week without activity, and this demo will be shown intermittently rather than daily. A paused project means a dead demo in front of a funder.

Add `.github/workflows/keepalive.yml`: a daily cron that runs a trivial query against `compass-prod`. It costs nothing and removes the failure mode. If the production project moves to a paid tier later, delete the workflow.

### 12.8 Definition of production-ready

- `/dev/components` deleted or gated behind a non-production environment check.
- `noindex` removed only at launch, never before.
- Custom domain attached with HTTPS enforced.
- `NOTES.md` lists every accepted trade-off, every `TODO` in content, and the current state of both Supabase projects.

---

## 13. Repository layout

```
/app
  /(learner)
    page.tsx                  # seat code entry
    /fortsetzen/page.tsx
    /kurs/page.tsx            # resolves to current unit
    /kurs/[step]/[unit]/page.tsx
    /kurs/[step]/extras/[unit]/page.tsx
    /zertifikat/[id]/page.tsx
  /quiz/page.tsx
  /admin/page.tsx
  /dev/components/page.tsx    # delete before production
/components                   # the nine, plus two admin
/content
  /de  { course.ts, assessment.ts, quiz.ts }
  /en  { course.ts, assessment.ts }
/lib
  /content  { schema.ts, load.ts }
  /db       { client.ts, queries.ts }
  /session  { sign.ts, resolve.ts }
  /strings  { de.ts, en.ts, t.ts }
/supabase
  /migrations                 # forward-only, sequentially numbered
  { seed.sql, config.toml }
/tests
  smoke.spec.ts
/.github/workflows
  { ci.yml, keepalive.yml }
.env.example                  # committed, names only, no values
vercel.json                   # region fra1
SPEC.md
CLAUDE.md
NOTES.md                      # decisions, TODOs, accepted trade-offs
```