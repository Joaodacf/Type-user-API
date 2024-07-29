import express from 'express'
import { AtualizarUsuario, CadastroUsuario, DeletarUsuario, ListarUsuario, loginUsuario, verificarCodigo } from './controladores/usuario';
import validarRequisicao from './midlewares/midlesSchema';
import { userSchema } from './schema/user.schema';
import { userLoginSchema } from './schema/user-login-schema';
export const routes = express();


// rotas de usuario 
routes.post('/cadastro', validarRequisicao(userSchema), CadastroUsuario)
routes.get('/listar/:id', ListarUsuario)
routes.delete('/deletar/:id', DeletarUsuario)
routes.put('/atualizar/:id', validarRequisicao(userSchema), AtualizarUsuario)
routes.post('/login', validarRequisicao(userLoginSchema), loginUsuario);

routes.post('/codigo', verificarCodigo)
