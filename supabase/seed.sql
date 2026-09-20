-- Seed: one institution, 30 seat codes, one pre-activated demo learner with partial progress.
-- Unit and question ids match /content/de (see NOTES.md, id conventions).

insert into institutions (id, name, locale_default, track) values
  ('00000000-0000-4000-8000-000000000001', 'Demo-Institution Berlin', 'de', 'bewerbung');

-- Seat 1 is the demo learner's seat and has a fixed id.
insert into seats (id, institution_id, code, staff_ref) values
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', '9H8ETYJT', 'DEMO-01');

insert into seats (institution_id, code, staff_ref)
select '00000000-0000-4000-8000-000000000001', c.code, c.staff_ref
from (values
  ('R6KT26M6', 'PLATZ-02'), ('T573UVUT', 'PLATZ-03'), ('TUADCKCT', 'PLATZ-04'),
  ('7CSEDRJG', 'PLATZ-05'), ('LQWUER5N', 'PLATZ-06'), ('U8QVBM8H', 'PLATZ-07'),
  ('5CBPNMRW', 'PLATZ-08'), ('SNLSYBPB', 'PLATZ-09'), ('Q53FZU7D', 'PLATZ-10'),
  ('74JFKJTK', 'PLATZ-11'), ('5Q8WPWPE', 'PLATZ-12'), ('3PKMQQHA', 'PLATZ-13'),
  ('9J9LWB42', 'PLATZ-14'), ('QTF7SJ8C', 'PLATZ-15'), ('VWBDPEU5', 'PLATZ-16'),
  ('F4CRR3TV', 'PLATZ-17'), ('NZSSMCGZ', 'PLATZ-18'), ('GSHVWLQS', 'PLATZ-19'),
  ('5S6SR4MC', 'PLATZ-20'), ('KEAEY4XU', 'PLATZ-21'), ('7YH72YLE', 'PLATZ-22'),
  ('CHC4TR4Y', 'PLATZ-23'), ('FM5YS4SE', 'PLATZ-24'), ('X5LNLWPK', 'PLATZ-25'),
  ('VMSD8J2X', 'PLATZ-26'), ('9NTA8UYX', 'PLATZ-27'), ('H6XA3YM7', 'PLATZ-28'),
  ('SYS33JTR', 'PLATZ-29'), ('XC5YXCWK', 'PLATZ-30')
) as c (code, staff_ref);

-- Demo learner: redeemed seat 1 three days ago, finished "start", is inside m1.
update seats set activated_at = now() - interval '3 days'
where id = '00000000-0000-4000-8000-000000000101';

insert into learners (id, seat_id, institution_id, locale, created_at, last_seen_at) values
  ('00000000-0000-4000-8000-000000000201',
   '00000000-0000-4000-8000-000000000101',
   '00000000-0000-4000-8000-000000000001',
   'de', now() - interval '3 days', now() - interval '1 day');

insert into progress (learner_id, step_id, unit_id, status, time_on_task_s, first_seen_at, completed_at) values
  ('00000000-0000-4000-8000-000000000201', 'start', 'start-willkommen',        'complete',  70, now() - interval '3 days', now() - interval '3 days'),
  ('00000000-0000-4000-8000-000000000201', 'start', 'start-was-dich-erwartet', 'complete',  85, now() - interval '3 days', now() - interval '3 days'),
  ('00000000-0000-4000-8000-000000000201', 'start', 'start-wie-du-lernst',     'complete',  60, now() - interval '3 days', now() - interval '3 days'),
  ('00000000-0000-4000-8000-000000000201', 'start', 'start-aufhoeren-ist-ok',  'complete',  45, now() - interval '3 days', now() - interval '3 days'),
  ('00000000-0000-4000-8000-000000000201', 'start', 'start-einstiegsfragen',   'complete', 240, now() - interval '3 days', now() - interval '3 days'),
  ('00000000-0000-4000-8000-000000000201', 'm1',    'm1-muster-statt-wissen',  'complete', 130, now() - interval '1 day',  now() - interval '1 day'),
  ('00000000-0000-4000-8000-000000000201', 'm1',    'm1-wahrscheinlich-richtig','complete', 110, now() - interval '1 day',  now() - interval '1 day'),
  ('00000000-0000-4000-8000-000000000201', 'm1',    'm1-check',                'started',   40, now() - interval '1 day',  null);

-- First attempt on m1-check-q1 was wrong: this item shows the < 55 % flag in the admin.
insert into check_attempts (learner_id, question_id, option_id, is_correct, attempt_no, created_at) values
  ('00000000-0000-4000-8000-000000000201', 'm1-check-q1', 'a', false, 1, now() - interval '1 day'),
  ('00000000-0000-4000-8000-000000000201', 'm1-check-q1', 'c', true,  2, now() - interval '1 day'),
  ('00000000-0000-4000-8000-000000000201', 'm1-check-q2', 'b', true,  1, now() - interval '1 day');

-- Pre-assessment: 5 of 12 correct.
insert into assessments (learner_id, phase, score, answers, completed_at) values
  ('00000000-0000-4000-8000-000000000201', 'pre', 5, '[
    {"questionId": "assess-q01", "optionId": "b", "isCorrect": true},
    {"questionId": "assess-q02", "optionId": "a", "isCorrect": true},
    {"questionId": "assess-q03", "optionId": "a", "isCorrect": false},
    {"questionId": "assess-q04", "optionId": "c", "isCorrect": false},
    {"questionId": "assess-q05", "optionId": "a", "isCorrect": true},
    {"questionId": "assess-q06", "optionId": "a", "isCorrect": false},
    {"questionId": "assess-q07", "optionId": "b", "isCorrect": true},
    {"questionId": "assess-q08", "optionId": "c", "isCorrect": false},
    {"questionId": "assess-q09", "optionId": "b", "isCorrect": false},
    {"questionId": "assess-q10", "optionId": "b", "isCorrect": true},
    {"questionId": "assess-q11", "optionId": "c", "isCorrect": false},
    {"questionId": "assess-q12", "optionId": "a", "isCorrect": false}
  ]'::jsonb, now() - interval '3 days');
