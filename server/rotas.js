const express = require('express')
const router = express.Router() //Objeto do express que serve para gerenciamento de rotas
const controlador = require('./controlador')

//SESSÃO DE CRUD

router.post('/registro', controlador.criarUsuario)

app.post('/login', controlador.login)

module.exports = router //Exporta a rota