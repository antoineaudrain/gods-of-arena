create table scheduled_battles
(
	first_type varchar(255) not null,
	second_type varchar(255) not null,
	with_animal boolean default false not null,
	date timestamp default now() not null
);

alter table scheduled_battles owner to goa;

create table characters
(
	id uuid primary key not null,
	character varchar(255) not null,
	metadata json,
	quantity integer default 1
);

alter table gladiators owner to goa;

create table battles
(
	first uuid
		constraint battles_characters_id_fk
			references gladiators
				on update cascade on delete cascade,
	second uuid
		constraint battles_characters_id_fk_2
			references gladiators
				on update cascade on delete cascade,
	animals uuid
		constraint battles_characters_id_fk_3
			references gladiators
				on update cascade on delete cascade,
	date timestamp default now()
);

alter table battles owner to goa;

