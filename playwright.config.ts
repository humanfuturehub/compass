import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from '@playwright/test';

// Local runs read .env.local (no dotenv dependency); CI passes real env vars.
if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const match = /^([A-Z_]+)=(.*)$/.exec(line.trim());
    if (match && match[1] && process.env[match[1]] === undefined) process.env[match[1]] = match[2] ?? '';
  }
}

const baseURL = process.env.E2E_BASE_URL ?? 'http://localhost:3000';
const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: './tests',
  timeout: 180_000,
  // Remote previews answer from cold functions; 5 s assertions are too tight there.
  expect: { timeout: process.env.E2E_BASE_URL ? 20_000 : 5_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL,
    // 90% of real usage is mobile portrait: run the smoke test at the design target.
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    // Vercel Deployment Protection on preview URLs.
    extraHTTPHeaders: bypass ? { 'x-vercel-protection-bypass': bypass } : {},
    trace: 'retain-on-failure',
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : { command: 'npm run dev', url: baseURL, reuseExistingServer: true, timeout: 120_000 },
});
