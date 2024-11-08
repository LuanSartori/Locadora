create database locadora;
use locadora;

CREATE TABLE clientes (
    id integer primary key auto_increment,
    nome varchar(60) not null,
    endereco varchar(60) not null,
    telefone varchar(15) not null
);
