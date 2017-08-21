create database if not exists assignment1;
USE assignment1;


create table if not exists Users(
    user_id int not null auto_increment,
    username varchar(50) not null,
    location varchar(50) not null,
    email varchar(50) not null,
    password varchar(50) not null,
    creation_date timestamp not null default NOW(),
    active TINYINT(1) not null default 1,
    primary key (user_id)
);

create table if not exists Projects(
    project_id int not null auto_increment,
    title varchar(50) not null,
    subtitle varchar(100) not null,
    description varchar(1000) not null,
    target int not null,
    image_data blob,
    project_open TINYINT(1) not null default 1,
    creation_date timestamp not null default NOW(),
    primary key (project_id)
);

create table if not exists Rewards(
    reward_id int not null auto_increment,
    project_id int not null,
    amount int not null,
    description varchar(300) not null,
    primary key(reward_id),
    foreign key (project_id) references Projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table if not exists Creator(
    backer_id int not null auto_increment,
    user_id int not null,
    project_id int not null,
    name varchar(50) not null,
    creation_date timestamp not null default NOW(),
    primary key (backer_id),
    foreign key (user_id) references Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (project_id) references Projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table if not exists Backers(
    backer_id int not null auto_increment,
    user_id int not null,
    project_id int not null,
    name varchar(50) not null,
    amount int not null,
    creation_date timestamp not null default NOW(),
    card_auth_token varchar(250) not null,
    is_anonymous TINYINT(1) not null default 0,
    primary key (backer_id),
    foreign key (user_id) references Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    foreign key (project_id) references Projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE
);

insert into Users(username, location, email, password) values
("Samuel", "Christchurch", "samjhooker@gmail.com", "password"),
("James", "Auckland", "samjhooker@gmail.com", "password"),
("Hooker", "Wellington", "samjhooker@gmail.com", "password");

insert into Projects(title, subtitle, description, target) values
("Awesome Project", "Really quite awesome", "undescribably awesome", 1000000);

insert into Backers(user_id, project_id, name, amount) values
(2,1,"James", 90);

insert into Creator(user_id, project_id, name) values
(1,1,"Samuel");
