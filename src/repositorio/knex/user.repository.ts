import knex from "../../conection/knex";
import { IUser, IUserCreat } from "../../models/user";
import { IUserRepository } from "../user";




export class KnexUserRepository implements IUserRepository {
    async getUserById(id: number): Promise<IUser> {
        return await knex('usuarios').where({ id }).first();
    }
    async createUser(user: IUserCreat): Promise<void> {
        return await knex('usuarios').insert(user);
    }
    async getUserByEmail(email: string): Promise<IUser> {
        return await knex('usuarios').where({ email }).first();

    }
    async listarUsuario(): Promise<IUser[]> {
        return await knex('usuarios');
    }
    async deleteUser(id: number): Promise<void> {
        return await knex('usuarios').where({ id }).del();
    }
    async updateUser(id: number, user: IUserCreat): Promise<void> {
        return await knex('usuarios').where({ id }).update(user);
    }

} 
