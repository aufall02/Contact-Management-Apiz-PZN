import { CustomValidationError } from "../error/custom-validation-error.js";
import { ResponseError } from "../error/response-error.js";
import pkg from "joi";
const { ValidationError } = pkg;

export const validate = (schema, request) => {
    const result = schema.validate(request, {
        // menampilkan seluruh error
        abortEarly: false,
        // abaikan field tambahan yang tidak perlu
        allowUnknown: false
    });

    if (result.error) {
        throw new CustomValidationError(result.error)
    } else {
        return result.value;
    }
};