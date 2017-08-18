create table Users(
    user_id int not null auto_increment,
    username varchar(50) not null,
    location varchar(50) not null,
    email varchar(50) not null,
    password varchar(50) not null,
    creation_date timestamp not null default NOW(),
    primary key (user_id)
);

create table Projects(
    project_id int not null auto_increment,
    title varchar(50) not null,
    subtitle varchar(100) not null,
    description varchar(1000) not null,
    target int not null,
    user_id int not null,
    creation_date timestamp not null default NOW(),
    primary key (project_id),
    foreign key (user_id) references Users(user_id)
);

create table Rewards(
    reward_id int not null auto_increment,
    project_id int not null,
    amount int not null,
    description varchar(300) not null,
    primary key(reward_id),
    foreign key (project_id) references Projects(project_id)
);

create table Creator(
    backer_id int not null auto_increment,
    user_id int not null,
    project_id int not null,
    name varchar(50) not null,
    creation_date timestamp not null default NOW(),
    primary key (backer_id),
    foreign key (user_id) references Users(user_id),
    foreign key (project_id) references Projects(project_id)
);

create table Backers(
    backer_id int not null auto_increment,
    user_id int not null,
    project_id int not null,
    name varchar(50) not null,
    amount int not null,
    creation_date timestamp not null default NOW(),
    primary key (backer_id),
    foreign key (user_id) references Users(user_id),
    foreign key (project_id) references Projects(project_id)
);

create table Images(
    image_id int not null auto_increment,
    project_id int not null,
    creation_date timestamp not null default NOW(),
    image_data blob not null,
    primary key (image_id),
    foreign key (project_id) references Projects(project_id)
);

insert into Users(username, location, email, password) values
("Samuel", "Christchurch", "samjhooker@gmail.com", "password"),
("James", "Auckland", "samjhooker@gmail.com", "password"),
("Hooker", "Wellington", "samjhooker@gmail.com", "password");

insert into Projects(title, subtitle, description, target, user_id) values
("Awesome Project", "Really quite awesome", "undescribably awesome", 1000000, 1);

insert into Backers(user_id, project_id, name, amount) values
(2,1,"James", 90);
