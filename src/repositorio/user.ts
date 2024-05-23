import { IUser, IUserCreat } from "../models/user";

export interface IUserRepository {
    getUserByEmail(email: string): Promise<IUser>;
    getUserById(id: number): Promise<IUser>;
    createUser(user: IUserCreat): Promise<void>;
    listarUsuario(): Promise<IUser[]>;
    deleteUser(id: number): Promise<void>;
    updateUser(id: number, user: IUserCreat): Promise<void>;

}