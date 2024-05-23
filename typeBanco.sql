CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome varchar not null , 
    email varchar not null unique , 
    senha varchar not null 
);