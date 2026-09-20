-- Row Level Security on every table.
--
-- There is no Supabase Auth in Compass. Sessions are seat-code cookies verified on the
-- server, and every read and write goes through server actions using the service role,
-- which bypasses RLS. Enabling RLS with no permissive policies means the public anon key
-- can read and write nothing. The REVOKEs below are a second layer for the same effect.

alter table institutions       enable row level security;
alter table seats              enable row level security;
alter table learners           enable row level security;
alter table progress           enable row level security;
alter table check_attempts     enable row level security;
alter table assessments        enable row level security;
alter table certificates       enable row level security;
alter table merkblatt_downloads enable row level security;
alter table public_quiz_runs   enable row level security;

revoke all on all tables in schema public from anon, authenticated;
revoke all on all sequences in schema public from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema public
  revoke all on sequences from anon, authenticated;
