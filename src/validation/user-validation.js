import Joi from "joi";

const registerUserValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required()
});

const loginUserValidation = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required()
});

export {
    registerUserValidation,
    loginUserValidation
}
