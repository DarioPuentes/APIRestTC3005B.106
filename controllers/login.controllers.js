import User from "../models/user.model.js"
import { hash } from "../utils/hash.js"

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ isLogin: false, msg: "Usuario no encontrado", user: {} });
        }
        const salt = user.password.substring(0, process.env.SALT_SIZE);
        const hashed = hash(password, salt);
        if (user.password === hashed) {
            res.json({ isLogin: true, msg: "ok", user: user });
        } else {
            res.status(401).json({ isLogin: false, msg: "password incorrecta", user: {} });
        }
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ isLogin: false, msg: "Error interno del servidor", user: {} });
    }
}