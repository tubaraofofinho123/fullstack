import Express from "express"
import bcryptjs from "bcryptjs"
import { User,criarTabelas} from './db.js'
import jwt from "jsonwebtoken" //npm i jsonwebtoken
import cors from "cors"
//O npm run dev funciona pois foi definido manualmente em "dev": "nodemon index.js"

const app = Express()
app.use(Express.json())
app.use(cors())
//criarTabelas()
app.post('/registro', async function(req, res){
    try{
        const {nome, sobrenome, email, senha, nascimento} = req.body
        if(!nome || !sobrenome || !email || !senha || !nascimento){
            res.status(406).send("Todos os campos devem ser enviados")
            return
        } 

        if(await User.findOne({where: {email: email}})){
            res.status(400).send("Usuário já existe no sistema")
            return
        }
        const senhaCriptografada = bcryptjs.hashSync(senha, 10)
        const novoUsuario = User.create({
            nome:nome,
            sobrenome: sobrenome,
            email: email,
            senha: senhaCriptografada,
            dataNascimento: nascimento,
        })
        res.status(201).send("Usuário criado")
        return
    } catch(error){
        res.send("OK")
    }
})

app.post('/login', async function(req, res){
    try{
        const {email, senha} = req.body
        if(!email || !senha){
            res.status(400).send("Todos os campos devem ser preenchidos")
            return
        }
        const usuario = await User.findOne({where: {email: email}})
        if(!usuario){
            res.send("Este email não está cadastrado")
            return
        }

        const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha)
        if(!senhaCorreta){
            res.send("A senha está incorreta")
            return
        }
        console.log(usuario)
        const token = jwt.sign(
            {
                nome: usuario.nome,
                email: usuario.email,
                status: usuario.status
            },//payload
            'chavesupersegura', //chave de criptografia
            {expiresIn: "30d"}//tempo de expiracao   
            
             
        )
        res.send({msg: "Você foi logado", token:token})
    } catch(error){
        console.log(error)
        res.status(500).send("Houve um problema")
    }
})
app.listen(8000)