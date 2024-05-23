import joi, { Schema } from 'joi';
const validarRequisicao = (joiSchema: Schema) => async (req: any, res: any, next: any) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


export default validarRequisicao;