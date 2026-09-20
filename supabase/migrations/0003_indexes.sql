-- Indexes for the access paths the app and the admin dashboard use.

create index progress_learner_id_idx           on progress (learner_id);
create index check_attempts_question_attempt_idx on check_attempts (question_id, attempt_no);
create index check_attempts_learner_question_idx on check_attempts (learner_id, question_id);
create index learners_institution_id_idx       on learners (institution_id);
create index seats_institution_id_idx          on seats (institution_id);
