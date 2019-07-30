create table if not exists types
(
    first_type varchar(255) not null,
    second_type varchar(255) not null,
    with_animal boolean default false not null,
    date timestamp default now() not null
);

-- CREATE TABLE IF NOT EXISTS gladiators (
--
-- )