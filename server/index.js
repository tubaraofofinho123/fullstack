import Express from "express";
import cors from "cors";
import rotas from "./rotas.js";

const app = Express();
app.use(Express.json());
app.use(cors());
// criarTabelas();

app.use("/", rotas);

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000');
});
