
import { CustomAPIError } from "../errors/custom-error.js"
const errorHandlerMiddleware = async (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: 'Something went wrong with ' + err.message })
}
export default errorHandlerMiddleware;
