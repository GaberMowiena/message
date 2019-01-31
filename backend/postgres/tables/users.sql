BEGIN TRANSACTION;
CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR(100),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  city text NOT NULL,
  cohort text NOT NULL
);

COMMIT;
