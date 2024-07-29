

export interface IUser {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

export interface IUserCreat {
    nome: string;
    email: string;
    senha: string;
}

export interface IresponseUserLogin {
    usuario: Omit<IUser, "senha">;

}
