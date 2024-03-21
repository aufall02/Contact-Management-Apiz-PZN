import { ResponseError } from "../error/response-error.js";
import pkg from "joi";
const { ValidationError } = pkg;

export const errorMiddleware = async (err, req, res, next) => {
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else if (err instanceof ValidationError) {
        res.status(400).json({
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            errors: err.message
        });
    }
};