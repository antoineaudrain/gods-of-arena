create table scheduled_battles
(
	first_type varchar(255) not null,
	second_type varchar(255) not null,
	with_animal boolean default false not null,
	date timestamp default now() not null,
	id uuid not null
		constraint scheduled_battles_pk
			primary key
);

alter table scheduled_battles owner to goa;

create unique index scheduled_battles_id_uindex
	on scheduled_battles (id);

create table gladiators
(
	id uuid not null
		constraint characters_pkey
			primary key,
	character varchar(255) not null,
	metadata json
);

alter table gladiators owner to goa;

create table animals
(
	black_sheep integer,
	tiger integer,
	lion integer,
	id uuid not null
		constraint animals_pk
			primary key
);

alter table animals owner to goa;

create unique index animals_id_uindex
	on animals (id);

create table battles
(
	first uuid not null
		constraint battles_characters_id_fk
			references gladiators
				on update cascade on delete cascade,
	second uuid not null
		constraint battles_characters_id_fk_2
			references gladiators
				on update cascade on delete cascade,
	animals uuid
		constraint battles_animals_id_fk
			references animals
				on update cascade on delete cascade,
	date timestamp default now(),
	id uuid not null
		constraint battles_pk
			primary key
);

alter table battles owner to goa;

create unique index battles_id_uindex
	on battles (id);

