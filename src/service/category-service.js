import { createCategoryValidation, getCategoryValidation, searchCategoryValidation, updateCategoryValidation } from "../validation/category-validation.js";
import { validate } from "../validation/validation.js";
import db from '../../models/index.js';
import { ResponseError } from "../error/response-error.js";
import { Op } from "sequelize";

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

const search = async (request) => {
    request = validate(searchCategoryValidation, request);

    const filters = [];

    if (request.name) {
        filters.push({
        name: { [Op.like]: `%${request.name}%` }
        });
    }

    const limit = request.size;
    const offset = (request.page - 1) * request.size;

    const categories = await Category.findAll({
        where: { [Op.and]: filters },
        attributes: ["id", "name"],
        limit,
        offset
    });

    const totalItems = await Category.count({
        where: { [Op.and]: filters }
    });

    return {
        data: categories,
        pagination: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

const get = async (id) => {
    id = validate(getCategoryValidation, id);

    const category = await Category.findOne({
        where: { id: id },
    });

    if (!category) {
        throw new ResponseError(404, "Category not found");
    }

    return category;
}

const update = async (id, request) => {
    const categoryId = validate(getCategoryValidation, id);

    const category = await Category.findOne({
        where: { id: id },
    });

    if (!category) {
        throw new ResponseError(404, "Category not found");
    }

    request = validate(updateCategoryValidation, request);

    const countCategory = await Category.count({
        where: {
            name: request.name
        }
    });

    if (countCategory === 1) {
        throw new ResponseError(400, "Category already exists");
    }

    const data = {}
    data.name = request.name;
    data.modified_by = request.modifiedBy;
    data.modified_at = new Date();

    await Category.update(
        data,
        {
            where: {
                id: categoryId
            },
        }
    );

    return Category.findOne({
        where: {
            id: categoryId
        },
        attributes: ["id", "name", "modified_by", "modified_at"]
    });
}

export default {
    create,
    search,
    get,
    update
}
