CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome varchar not null , 
    email varchar not null unique , 
    senha varchar not null 
);
CREATE TABLE autenticacao (
id SERIAL PRIMARY KEY ,
usuario_id int not null references usuarios(id),
codigo varchar not null ,
 expira timestamp not null 
)