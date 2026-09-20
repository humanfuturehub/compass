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