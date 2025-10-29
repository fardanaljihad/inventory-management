import { createCategoryValidation } from "../validation/category-validation.js";
import { validate } from "../validation/validation.js";
import db from '../../models/index.js';
import { ResponseError } from "../error/response-error.js";

const { Category } = db;

const create = async (request) => {
    const category = validate(createCategoryValidation, request);

    const countCategory = await Category.count({
        where: {
            name: request.name
        }
    });

    if (countCategory === 1) {
        throw new ResponseError(400, "Category already exists")
    }

    category.created_by = request.createdBy;

    const newCategory = await Category.create(category);

    return {
        name: newCategory.name,
        created_by: newCategory.created_by
    }
}

export default {
    create
}
