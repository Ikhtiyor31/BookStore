
import Jwt from "jsonwebtoken"
import config from "../config/config.js"

const generateAccessToken = (username) => {
    return Jwt.sign({name: username}, config.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}

const refreshAccessToken = (username) => {
    return Jwt.sign({name: username}, config.ACCESS_TOKEN_SECRET)
}

export {generateAccessToken, refreshAccessToken};

