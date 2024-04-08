import { logger } from "../application/logging.js";
import { ResponseError } from "../error/response-error.js";
// import pkg from "joi";
// const { ValidationError } = pkg;
import { CustomValidationError } from "../error/custom-validation-error.js";

export const errorMiddleware = async (err, req, res, next) => {
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    } else if (err instanceof CustomValidationError) {
        logger.info(err)
        res.status(400).json({
            errors: err.message
        }).end();
    } else {
        res.status(500).json({
            errors: err.message
        });
    }
};