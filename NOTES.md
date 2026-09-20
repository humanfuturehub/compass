# NOTES

Decisions, accepted trade-offs and open TODOs for Compass v1. SPEC.md is the
specification; this file records where the build interprets or deviates from it.

## Decisions and accepted trade-offs

### Stack

- **Tailwind v3, not v4.** v4 needs `@tailwindcss/postcss`, which is outside the
  allowlist. v3 is exactly `tailwindcss` + `postcss` + `autoprefixer`. The Tailwind
  `theme` (not `extend`) replaces the colour, spacing, radius, shadow and type scales
  wholesale so that only token-named utility classes exist.
- **TypeScript pinned to 5.9.** TypeScript 7 (the Go-based compiler) shipped shortly
  before this build; Next.js 16's own type generation is not yet validated against it.
- **`@types/node`, `@types/react`, `@types/react-dom`** are installed. They are not on the
  allowlist by name but are implied by `typescript`; without them `tsc` cannot check
  anything.
- **No `create-next-app`**; it adds eslint. `package.json` is hand-written.
- **`@supabase/ssr` is not installed** although allowlisted. There is no Supabase Auth
  in Compass (sessions are seat-code cookies), so there is nothing for it to do.

### Data access and security

- **All database access is server-side through the service-role client.** RLS is enabled
  on every table with no permissive policies and `REVOKE ALL` from `anon` and
  `authenticated`, so the public anon key can read and write nothing. Scoping to
  `learner_id` and `institution_id` happens in server actions from the verified cookie.
  The anon key stays in the environment for the keepalive ping.
- **Session token** is `base64url({lid, exp}).base64url(HMAC-SHA256)` via Web Crypto, no
  dependency. Cookie `compass_session`, httpOnly, SameSite=Lax, Secure in production,
  180 days. The admin session uses the same signer with `{iid, exp}`, 12 hours, cookie
  `compass_admin`.
- **`ADMIN_ACCESS_CODES` format** is `institution_id:CODE,institution_id:CODE`. The seeded
  institution has a fixed UUID so `.env.example` documents a working example.
- **Seat codes are single-use.** Entering an already-activated code fails with a clear
  message. Losing both the cookie and the resume link means asking the partner for a new
  code (SPEC 6.1). Redemption is race-safe through `UNIQUE (learners.seat_id)`.
- **Secret check** (`scripts/check-secrets.mjs`) runs after `next build` and fails if the
  values of `SUPABASE_SERVICE_ROLE_KEY` / `SESSION_SECRET` (when set) or their names occur
  under `.next/static`.

### Environments

- **No Docker on the development machine.** Local development and Vercel Preview share
  the `compass-preview` Supabase project. `npm run db:reset` runs
  `supabase db reset --linked`. `npm run db:diff` needs Docker for the shadow database;
  without it, write migrations by hand and apply with `npm run db:push`.
- **`db:diff` produces timestamped file names.** Rename to the next sequential number
  (`0004_…`) before committing, per SPEC 12.4.
- **Keepalive** pings `/rest/v1/institutions` with the anon key. RLS answers 401/403, but
  the query still runs in Postgres, which is the activity that prevents pausing. If
  pausing still occurs, add a `keepalive()` RPC granted to `anon` in a new migration.
- **`noindex`** is emitted unconditionally via `metadata.robots` in v1 and removed at
  launch.

### Content model

- **Two unit types beyond the five in SPEC 5:** `assessment` (`phase: 'pre' | 'post'`)
  and `zertifikat` (display-name entry). The spec's union has no slot for the pre/post
  assessment or the certificate step, yet resume-to-exact-unit, `UnitDots` and gating must
  treat them like any other unit. Items still live in `assessment.ts`; the unit only names
  the phase.
- **Content is split by step** (`content/de/steps/*.ts`; `course.ts` is the index) to keep
  every file under ~200 lines.
- **Content is validated at build** because `lib/content/load.ts` runs zod at module load
  and statically rendered routes import it, so `next build` fails on a violation.
  `satisfies Course` on each content file gives typecheck-time errors as well.
- **One course per locale**, `track: 'bewerbung'`. The institution's `track` is stored but
  does not yet select content.
- **ID conventions, stable forever:** units `{step}-{slug}`, questions `{unit}-q{n}`,
  options `a | b | c | d`, assessment `assess-q01..q12`, quiz `quiz-q1..q7`. The seed, the
  admin item analysis and the smoke test depend on these.

### Behaviour

- **Course home is `/uebersicht`** (the spec names no route). `/` with a session redirects
  to `/kurs` (SPEC 6.3), `/kurs` to the first incomplete unit, and the AppHeader back
  control to `/uebersicht`. Completing a step's last unit returns to `/uebersicht`;
  mid-step goes to the next unit; the last unit of `abschluss` goes to the certificate.
- **Resume-link screen.** Redemption sets the cookie and lands on `/fortsetzen` (no
  token), which shows the link, a copy button and the WhatsApp hint. `/fortsetzen?t=…`
  verifies the token, sets the cookie and redirects to `/kurs`. `/uebersicht` links back
  with a quiet "Zugangslink anzeigen".
- **Progress on tab hide** uses `navigator.sendBeacon` to `POST /api/progress`, because
  server actions cannot be beaconed. Completion goes through a server action.
- **Time on task.** A unit's estimate is the step's `estimatedMinutes` divided by its
  required unit count; recorded time is capped server-side at 3× that. Extras write no
  progress rows.
- **Scenario choices** write `check_attempts` with `is_correct = NULL` and
  `question_id` = the scenario unit id.
- **Assessments** are unique per `(learner_id, phase)`; the first submission is kept.
- **Certificate hours** are the sum of `estimatedMinutes` over required steps (nominal
  course length), not measured time. The wordmark is "Human Future Hub" set in League
  Spartan until a logo asset exists.

### Testing

- **The Playwright smoke test provisions its own seat** through the service-role key in
  `beforeAll`, so no database reset is needed and seeded demo data stays intact. CI passes
  `E2E_SUPABASE_URL`, `E2E_SUPABASE_SERVICE_ROLE_KEY` (preview) and
  `VERCEL_AUTOMATION_BYPASS_SECRET` (Deployment Protection bypass header).
- **`scripts/check-tokens.mjs`** greps `app/`, `components/`, `lib/` for hex or px literals
  outside `app/globals.css` and `tailwind.config.ts`. Local tool, not a CI gate (SPEC 12.6).

## Content TODOs

- **Editorial review** of all German content by Human Future Hub. Everything in
  `content/de` was drafted to the schema (A2–B1, Du-form) and is complete enough to walk
  the path end to end; `m3-check` and `m4-merkblatt` in particular were written as
  working schema examples (SPEC 5.1) and should be reviewed before launch.
- **Tracks.** Only `bewerbung` exists. The `kinder` and `unterricht` tracks need their
  own `m4` scenario and Merkblatt at minimum; `m1`–`m3` can be shared.
- **English.** `content/en` has interface strings, the `start` step and the assessment.
  `m1`–`abschluss` are re-exported from German in `content/en/course.ts`.
- **Public quiz** ships in German only (`content/de/quiz.ts`).
- **Assessment items are skippable.** An unanswered item is stored with
  `optionId: null` and counts as incorrect, so the instrument never blocks. The footer
  "Weiter" on assessment and certificate units appears only after submission; the
  runner's own button is the single primary action on those screens (SPEC 6.8).

## Build status (2026-09-20)

| Phase | Code | Verified | Notes |
|---|---|---|---|
| 0 Repository | done | local only | Remote gates (db reset --linked, preview URL, CI) need the accounts |
| 1 Design system | done | yes | 390px screenshots, focus ring, token and contrast greps |
| 2 Content | done | yes | Build fails on a deliberate schema violation |
| 3 Access | done | no | Signer unit-tested; redemption and resume need compass-preview |
| 4 Path | done | partial | Path helpers unit-tested; gating and beacon need compass-preview |
| 5 Checks | done | no | Needs compass-preview |
| 6 Assessment, certificate | not started | | |
| 7 Admin | not started | | |
| 8 Quiz, smoke test | not started | | |

## Supabase projects

| Project | Region | State |
|---|---|---|
| `compass-preview` | EU Central | not yet created |
| `compass-prod` | EU Central | not yet created |
