import joi from "joi";


export const userSchema = joi.object({
    nome: joi.string().required().messages({
        "string.empty": "O nome não pode ser vazio",
        "any.required": "O nome é obrigatório"
    }),
    email: joi.string().email().required().messages({
        "string.empty": "O email não pode ser vazio",
        "string.email": "O email deve ser válido",
        "any.required": "O email é obrigatório"
    }),
    senha: joi.string().min(5).required().messages({
        "string.empty": "A senha não pode ser vazia",
        "string.min": "A senha deve ter no mínimo 5 caracteres",
        "any.required": "A senha é obrigatória"
    })
});



