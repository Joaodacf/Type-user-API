import { iUserAutenticate } from "../models/autenticacao";

export interface IAutenticacaoRepositorio {
    createCode(usuario_id: number, codigo: string, expira: Date): Promise<iUserAutenticate>
    getCodeByUserId(usuario_id: number): Promise<iUserAutenticate[]>
    deleteCode(id: number): Promise<iUserAutenticate>
}