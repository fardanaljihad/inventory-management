import Joi from "joi";

const createCategoryValidation = Joi.object({
    name: Joi.string().max(255).required(),
    createdBy: Joi.string().email({ minDomainSegments: 2 }).required()
});

const searchCategoryValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    name: Joi.string().optional(),
});

const getCategoryValidation = Joi.string()
    .uuid({ version: 'uuidv4' })
    .required();

const updateCategoryValidation = Joi.object({
    name: Joi.string().max(255).required(),
    modifiedBy: Joi.string().email({ minDomainSegments: 2 }).required()
});

export {
    createCategoryValidation,
    searchCategoryValidation,
    getCategoryValidation,
    updateCategoryValidation
}
