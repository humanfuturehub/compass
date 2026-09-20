-- Compass schema, SPEC.md Section 8.
-- Forward-only. Never edit once applied.

create table institutions (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  locale_default text not null check (locale_default in ('de', 'en')),
  track          text not null check (track in ('bewerbung', 'kinder', 'unterricht')),
  created_at     timestamptz not null default now()
);

create table seats (
  id             uuid primary key default gen_random_uuid(),
  institution_id uuid not null references institutions (id) on delete cascade,
  -- 8 chars, uppercase, unambiguous alphabet: no O, 0, I, 1
  code           text not null unique check (code ~ '^[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{8}$'),
  staff_ref      text,
  activated_at   timestamptz,
  created_at     timestamptz not null default now()
);

create table learners (
  id             uuid primary key default gen_random_uuid(),
  -- unique: a seat redeems exactly once; this is what makes redemption race-safe
  seat_id        uuid not null unique references seats (id) on delete cascade,
  institution_id uuid not null references institutions (id) on delete cascade,
  locale         text not null check (locale in ('de', 'en')),
  display_name   text,
  created_at     timestamptz not null default now(),
  last_seen_at   timestamptz not null default now()
);

create table progress (
  learner_id     uuid not null references learners (id) on delete cascade,
  step_id        text not null,
  unit_id        text not null,
  status         text not null check (status in ('started', 'complete')),
  time_on_task_s integer not null default 0 check (time_on_task_s >= 0),
  first_seen_at  timestamptz not null default now(),
  completed_at   timestamptz,
  primary key (learner_id, unit_id)
);

create table check_attempts (
  id          uuid primary key default gen_random_uuid(),
  learner_id  uuid not null references learners (id) on delete cascade,
  question_id text not null,
  option_id   text not null,
  -- null for scenario choices, which have no correct answer
  is_correct  boolean,
  attempt_no  integer not null check (attempt_no >= 1),
  created_at  timestamptz not null default now()
);

create table assessments (
  id           uuid primary key default gen_random_uuid(),
  learner_id   uuid not null references learners (id) on delete cascade,
  phase        text not null check (phase in ('pre', 'post')),
  score        integer not null check (score >= 0),
  answers      jsonb not null,
  completed_at timestamptz not null default now(),
  -- one pre and one post per learner; the first submission is kept
  unique (learner_id, phase)
);

create table certificates (
  id           uuid primary key default gen_random_uuid(),
  learner_id   uuid not null unique references learners (id) on delete cascade,
  display_name text not null,
  hours        numeric(4, 2) not null,
  modules      jsonb not null,
  issued_at    timestamptz not null default now()
);

create table merkblatt_downloads (
  id           uuid primary key default gen_random_uuid(),
  learner_id   uuid not null references learners (id) on delete cascade,
  merkblatt_id text not null,
  created_at   timestamptz not null default now()
);

create table public_quiz_runs (
  id           uuid primary key default gen_random_uuid(),
  session_hash text not null,
  score        integer not null check (score >= 0),
  items_total  integer not null check (items_total > 0),
  created_at   timestamptz not null default now()
);
