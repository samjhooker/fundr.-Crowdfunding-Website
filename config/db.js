const mysql  =  require ('mysql');
const state  =  {
    pool: null,
  };


exports.connect  =  function(done)  {
    state.pool  =  mysql.createPool ({
        host:  process.env.SENG365_MYSQL_HOST || 'localhost',
        user:  'root',
        password:  'secret',
        port: process.env.SENG365_MYSQL_PORT || '6033',
        database:  'mysql',
      });
    done();
};




exports.get = function()  {
    return state.pool;
};









var sql = 'create database if not exist assignment1;\n' +
    'use assignment1;\n' +
    '\n' +
    '\n' +
    'create table Users(\n' +
    '    user_id int not null auto_increment,\n' +
    '    username varchar(50) not null,\n' +
    '    location varchar(50) not null,\n' +
    '    email varchar(50) not null,\n' +
    '    password varchar(50) not null,\n' +
    '    creation_date timestamp not null default NOW(),\n' +
    '    primary key (user_id)\n' +
    ');\n' +
    '\n' +
    'create table Projects(\n' +
    '    project_id int not null auto_increment,\n' +
    '    title varchar(50) not null,\n' +
    '    subtitle varchar(100) not null,\n' +
    '    description varchar(1000) not null,\n' +
    '    target int not null,\n' +
    '    image_data blob,\n' +
    '    project_open TINYINT(1) not null default 1,\n' +
    '    creation_date timestamp not null default NOW(),\n' +
    '    primary key (project_id)\n' +
    ');\n' +
    '\n' +
    'create table Rewards(\n' +
    '    reward_id int not null auto_increment,\n' +
    '    project_id int not null,\n' +
    '    amount int not null,\n' +
    '    description varchar(300) not null,\n' +
    '    primary key(reward_id),\n' +
    '    foreign key (project_id) references Projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE\n' +
    ');\n' +
    '\n' +
    'create table Creator(\n' +
    '    backer_id int not null auto_increment,\n' +
    '    user_id int not null,\n' +
    '    project_id int not null,\n' +
    '    name varchar(50) not null,\n' +
    '    creation_date timestamp not null default NOW(),\n' +
    '    primary key (backer_id),\n' +
    '    foreign key (user_id) references Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,\n' +
    '    foreign key (project_id) references Projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE\n' +
    ');\n' +
    '\n' +
    'create table Backers(\n' +
    '    backer_id int not null auto_increment,\n' +
    '    user_id int not null,\n' +
    '    project_id int not null,\n' +
    '    name varchar(50) not null,\n' +
    '    amount int not null,\n' +
    '    creation_date timestamp not null default NOW(),\n' +
    '    card_auth_token varchar(250) not null,\n' +
    '    is_anonymous TINYINT(1) not null default 0,\n' +
    '    primary key (backer_id),\n' +
    '    foreign key (user_id) references Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,\n' +
    '    foreign key (project_id) references Projects(project_id) ON DELETE CASCADE ON UPDATE CASCADE\n' +
    ');\n' +
    '\n' +
    'insert into Users(username, location, email, password) values\n' +
    '("Samuel", "Christchurch", "samjhooker@gmail.com", "password"),\n' +
    '("James", "Auckland", "samjhooker@gmail.com", "password"),\n' +
    '("Hooker", "Wellington", "samjhooker@gmail.com", "password");\n' +
    '\n' +
    'insert into Projects(title, subtitle, description, target) values\n' +
    '("Awesome Project", "Really quite awesome", "undescribably awesome", 1000000);\n' +
    '\n' +
    'insert into Backers(user_id, project_id, name, amount) values\n' +
    '(2,1,"James", 90);\n';