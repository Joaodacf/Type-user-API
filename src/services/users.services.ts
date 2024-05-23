import e from "express";
import { IUser, IUserCreat, IresponseUserLogin } from "../models/user";
import { IUserRepository } from "../repositorio/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export class UserService {
    constructor(private userRepository: IUserRepository) { }
    async getUserById(id: number): Promise<IUser> {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new Error("Usuario não encontrado")
        }
        return user;

    }
    async createUser(user: IUserCreat): Promise<void> {
        const verificacaoPoremail = await this.userRepository.getUserByEmail(user.email)
        if (verificacaoPoremail) {
            throw new Error("Email já cadastrado")
        }
        const senhaHash = bcrypt.hashSync(user.senha, 10);
        user.senha = senhaHash;
        return await this.userRepository.createUser(user)
    }
    async getUserByEmail(email: string): Promise<IUser> {
        return await this.userRepository.getUserByEmail(email);
    }
    async listarUsuario(): Promise<IUser[]> {

        return await this.userRepository.listarUsuario();


    }
    async deleteUser(id: number): Promise<void> {

        const usuario = await this.userRepository.getUserById(id);
        if (!usuario) {
            throw new Error("Usuario não encontrado")
        }
        return await this.userRepository.deleteUser(id);
    }
    async updateUser(id: number, user: IUserCreat): Promise<void> {
        const usuario = await this.userRepository.getUserById(id);
        if (!usuario) {
            throw new Error("Usuario não encontrado")
        }
        const senhaHash = bcrypt.hashSync(user.senha, 10);
        user.senha = senhaHash;
        return await this.userRepository.updateUser(id, user);
    }
    async UserLogin(email: string, senha: string,): Promise<IresponseUserLogin> {
        const usuario = await this.userRepository.getUserByEmail(email);
        if (!usuario) {
            throw new Error("Usuario não encontrado")
        }
        const senhaValida = bcrypt.compareSync(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error("Email ou senha invalidos")
        }
        /*  if (!process.env.SECRET) {
             throw new Error("Variavel de ambiente SECRET não definida")
         } */
        const Token = jwt.sign({ id: usuario.id }, process.env.SENHAJWT as string, { expiresIn: "1h" }); {
        }
        const { senha: _, ...usuarioLogado } = usuario;
        return { usuario: usuarioLogado, token: Token }
    }
}
