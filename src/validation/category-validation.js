import Joi from "joi";

const createCategoryValidation = Joi.object({
    name: Joi.string().max(255).required(),
    createdBy: Joi.string().email({ minDomainSegments: 2 }).required()
});

export {
    createCategoryValidation
}
