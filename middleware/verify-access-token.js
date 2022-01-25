
import { createCustomError } from "../errors/custom-error.js"
import CONFIG from "../config/config.js"
import Jwt  from "jsonwebtoken"

const authenticateToken = (req, res, next )=> {
    const token = req.headers['authorization']
    if (token == null) return next(createCustomError('No token provided.', 401))

    Jwt.verify(token, CONFIG.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(createCustomError('token expired', 403))
        
        req.session.user = user.name;
        next()
    })

}       
export default authenticateToken;