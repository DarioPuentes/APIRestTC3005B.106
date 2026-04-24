import User from "../models/user.model.js"

export const getUsers  = async (req,res) => {
    const users = await User.find()
    res.json(users)
}
export const getUser  = async (req,res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.json(user)
}
export const postUser = async (req,res) => {
    const {name, username, password} = req.body
    const newuser = new User({name, username, password})
    await newuser.save()
    res.json(newuser)
}
export const putUser =  async (req,res) => {
    const id = req.params.id
    const {name, username, password} = req.body
    const user = await User.findByIdAndUpdate(req.params.id,
        {name, username, password},
        {new: true}

    )
    res.json(user)

}
export const delUser =  async (req,res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({message: "Usuario eliminado"})
}
