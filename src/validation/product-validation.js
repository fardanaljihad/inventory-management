import Joi from "joi";

const createProductValidation = Joi.object({
    name: Joi.string().max(255).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().positive().required(),
    categoryId: Joi.string().uuid({ version: 'uuidv4' }).required(),
    createdBy: Joi.string().email({ minDomainSegments: 2 }).required()
});

const searchProductValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    categoryName: Joi.string().allow("").max(255).optional(),
    name: Joi.string().allow("").max(255).optional(),
});

const getProductValidation = Joi.string().uuid({ version: 'uuidv4' }).required();

export {
    createProductValidation,
    searchProductValidation,
    getProductValidation
}
