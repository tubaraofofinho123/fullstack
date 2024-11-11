import { User } from "../db.js";

const get_user = async (req, res) => {
    const id_req = req.params.id
    const user = await User.findOne({ where: { id: id_req } })
    if (!user) {
        res.status(404).send("Usuário não encontrado")
        return
    }
    res.status(200).send(`Usuário encontrado! \n Nome: ${user.nome} \n Sobrenome: ${user.sobrenome}\n Email: ${user.email} \n Data de nascimento: ${user.dataNascimento}`)
    return

}

export default { get_user }