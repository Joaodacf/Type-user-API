import e from "express";
import { IUser, IUserCreat, IresponseUserLogin } from "../models/user";
import { IUserRepository } from "../repositorio/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GeradorNumerosAleatorios } from "../midlewares/midlesSchema";
import nodemailer from "nodemailer";
import { transportar } from "../conection/Email";
import knex from "knex";
import { KnexAutenticacaoRepositorio } from "../repositorio/knex/Autenticacao.repositorio";
const autenticacaoRepository = new KnexAutenticacaoRepositorio();


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

        const gerador = new GeradorNumerosAleatorios(9);
        const numeroAleatorio = gerador.cincoNumerosAleatorios();
        // to do send email to user  with numeroAleatorio 
        transportar.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${usuario.nome} <${usuario.email}>`,
            subject: "Codigo de verificação",
            text: `Seu código de verificação é ${numeroAleatorio}`
        })
        await autenticacaoRepository.createCode(usuario.id, numeroAleatorio, new Date(Date.now() + 60000 * 15));
        const { senha: _, ...usuarioLogado } = usuario;
        return { usuario: usuarioLogado, }

    }
    async validacaoCodigo(usuario_id: number, codigo: string) {
        const usuario = await autenticacaoRepository.getCodeByUserId(usuario_id)
        if (!usuario.length) {
            throw new Error("Usuario não encontrado")
        }
        const verificarCodigo = usuario.find((user) => user.codigo === codigo)
        if (!verificarCodigo) {
            throw new Error("Codigo não encontrado")
        }
        if (verificarCodigo.expira < new Date()) {
            throw new Error("Codigo expirado , solicite um novo codigo")
        }
        const Token = jwt.sign({ id: usuario_id }, process.env.SENHAJWT as string, { expiresIn: "1h" });
        await autenticacaoRepository.deleteCode(verificarCodigo.id);

        return { Token };

    }
}
