import { Request, Response } from "express";
import { IUserCreat } from "../models/user";
import { UserService } from "../services/users.services";
import { KnexUserRepository } from "../repositorio/knex/user.repository";

const userService = new UserService(new KnexUserRepository());

export async function CadastroUsuario(req: Request, res: Response) {
    const { nome, email, senha }: IUserCreat = req.body;

    try {
        await userService.createUser({ nome, email, senha });
        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ message: error?.message || "Erro ao cadastrar usuário" });
    }
}

export async function ListarUsuario(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
        const user = await userService.getUserById(id);
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(400).json({ message: error?.message || "Erro ao buscar usuário" });
    }
}
export async function DeletarUsuario(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
        await userService.deleteUser(id);
        return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ message: error?.message || "Erro ao deletar usuário" });
    }

}
export async function AtualizarUsuario(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { nome, email, senha }: IUserCreat = req.body;
    try {
        await userService.updateUser(id, { nome, email, senha });
        return res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ message: error?.message || "Erro ao atualizar usuário" });
    }

}

export async function loginUsuario(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
        const Login = await userService.UserLogin(email, senha);
        return res.status(200).json(Login);
    } catch (error: any) {
        return res.status(400).json({ message: error?.message || "Erro ao logar usuário" });
    }


}
export async function verificarCodigo(req: Request, res: Response) {
    const { usuario_id, codigo } = req.body;
    try {
        const token = await userService.validacaoCodigo(usuario_id, codigo);
        return res.status(200).json(token);
    } catch (error: any) {
        return res.status(400).json({ message: error?.message || "Erro ao logar usuário" });
    }


}

