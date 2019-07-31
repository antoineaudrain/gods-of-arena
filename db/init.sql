create table if not exists battles
(
    date timestamp default now() not null,
    animals text[],
    first_gladiator json not null,
    second_gladiator json not null
);

create table if not exists scheduled_battles
(
    first_type varchar(255) not null,
    second_type varchar(255) not null,
    with_animal boolean default false not null,
    date timestamp default now() not null
);

alter table battles owner to goa;
alter table scheduled_battles owner to goa;