import express from 'express';
const router = express.Router(); // Objeto do express que serve para gerenciamento de rotas
import controlador from './controlador.js';


//SESSÃO DE CRUD

router.post('/registro', controlador.criarUsuario)

router.post('/login', controlador.login)

export default router //Exporta a rota