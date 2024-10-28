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

app.listen(8000)