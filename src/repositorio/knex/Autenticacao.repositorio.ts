import knex from "../../conection/knex";
import { iUserAutenticate } from "../../models/autenticacao";
import { IAutenticacaoRepositorio } from "../autenticacao";



export class KnexAutenticacaoRepositorio implements IAutenticacaoRepositorio {
    async createCode(usuario_id: number, codigo: string, expira: Date): Promise<iUserAutenticate> {
        return await knex('autenticacao').insert({ usuario_id, codigo, expira });
    }
    async getCodeByUserId(usuario_id: number): Promise<iUserAutenticate[]> {
        return await knex('autenticacao').where({ usuario_id });
    }
    async deleteCode(id: number): Promise<iUserAutenticate> {
        return await knex('autenticacao').where({ id }).del();
    }
}