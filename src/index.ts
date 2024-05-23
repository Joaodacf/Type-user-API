import 'dotenv/config'
import express from 'express';

import { routes } from './rotas';


const app = express();
const port = 3000;

app.use(express.json());
app.use(routes)

app.listen(port, () => console.log("rodando na porta 3000")
);




