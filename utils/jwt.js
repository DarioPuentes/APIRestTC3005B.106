import jwt from "jsonwebtoken";
import { Router } from "express";

export const validateJWT = Router()

validateJWT.use((req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(401).json({msg: "Se necesita un token"})
    }
    if (token.startsWith("Bearer")) {
        token = token.split(" ")[1]
    }
    jwt.verify(token, process.env.JWT, (e, decoded) => {
        if (e) {
            return res.status(401).json({msg:e.message})
        } else {
            req.decoded = decoded
            next()
        }
    })
})