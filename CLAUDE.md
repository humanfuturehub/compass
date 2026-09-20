# Compass

Self-paced AI literacy course for Human Future Hub. Full specification in SPEC.md.

## Hard rules

- No AI in the product. No model calls, no chat, no generation. AI failure demos are
  fixed transcripts stored in /content. If a task seems to need a model call, it is wrong.
- No dependency outside the allowlist in SPEC.md Section 2. Implement the small version instead.
- No literal hex or px values in components. Everything comes from tokens.
- Orange and teal never carry text on white. Backgrounds and borders only. See SPEC.md 3.2.
- No learner-facing strings inside components. Content in /content, interface strings in /lib/strings.
- Knowledge checks never block progression, never show a score, and always explain every option.
- Progress is shown as "Modul 3 von 6". Never a percentage bar.
- Never build anything listed in SPEC.md Section 9.
- The database is defined by /supabase/migrations. Never change schema in the Supabase
  dashboard. Migrations are forward-only and are never edited once applied.
- No secret is ever committed. SUPABASE_SERVICE_ROLE_KEY and SESSION_SECRET are server-only
  and must never appear in a NEXT_PUBLIC_ variable or in client component code.

## Conventions

- Mobile-first, 390px design target, 520px container. Admin is the only desktop surface.
- German is the source locale. English mirrors the same schema.
- Content IDs are stable forever. Item analysis depends on question_id never being reused.
- Files stay under ~200 lines.
- Record decisions and accepted trade-offs in NOTES.md.

## Commands

npm run dev · npm run typecheck · npm run build · npm run test:e2e
npm run db:reset    # rebuild from /supabase/migrations + seed.sql
npm run db:diff     # capture schema changes as the next numbered migration

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
