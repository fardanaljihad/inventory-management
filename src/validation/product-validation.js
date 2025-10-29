import Joi from "joi";

const createProductValidation = Joi.object({
    name: Joi.string().max(100).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().positive().required(),
    categoryId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    createdBy: Joi.string().email({ minDomainSegments: 2 }).required()
});

export {
    createProductValidation
}
