import joi, { Schema } from 'joi';
const validarRequisicao = (joiSchema: Schema) => async (req: any, res: any, next: any) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


export class GeradorNumerosAleatorios {
    max: number;

    constructor(max: number) {
        this.max = max;
    }

    numeroAleatorio() {
        return Number(Math.floor(Math.random() * this.max));
    }

    cincoNumerosAleatorios() {
        let numeros = [];
        for (let i = 0; i < 5; i++) {
            numeros.push(this.numeroAleatorio());
        }
        return numeros.join("");
    }

}




export default validarRequisicao;