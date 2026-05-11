import crypto from "crypto"

export const getSalt = () => {
    const size = process.env.SALT_SIZE
    return crypto.randomBytes(2*size).toString("base64url").substring(0, size)
}

export const hash = (password, salt) => {
    const pepper = process.env.PEPPER
    const hashing = crypto.createHash("sha256")
    return salt + hashing.update(salt + password + pepper).digest("base64url")
}