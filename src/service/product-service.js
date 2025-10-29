import { validate } from "../validation/validation.js";
import db from '../../models/index.js';
import { createProductValidation, searchProductValidation } from "../validation/product-validation.js";
import { ResponseError } from "../error/response-error.js";
import { Op } from "sequelize";

const { Product, Category } = db;

const create = async (request) => {
    const product = validate(createProductValidation, request);

    const countProduct = await Product.count({
        where: {
            name: request.name
        }
    });

    if (countProduct === 1) {
        throw new ResponseError(400, "Product already exists")
    }

    const countCategory = await Category.count({
        where: {
            id: request.categoryId
        }
    });

    if (countCategory !== 1) {
        throw new ResponseError(404, "Category not found")
    }

    product.created_by = request.createdBy;

    const newProduct = await Product.create(product);

    return {
        name: newProduct.name,
        price: newProduct.price,
        stock: newProduct.stock,
        category_id: newProduct.category_id,
        created_by: newProduct.created_by
    }
}

const search = async (request) => {
    request = validate(searchProductValidation, request);


    const limit = request.limit;
    const offset = (request.page - 1) * request.limit;

    const productFilter = {};
    if (request.name) {
        productFilter.name = { [Op.like]: `%${request.name}%` };
    }

    const categoryFilter = {};
    if (request.categoryName) {
        categoryFilter.name = { [Op.like]: `%${request.categoryName}%` };
    }

    const { rows: products, count: totalItems } = await Product.findAndCountAll({
        where: productFilter,
        include: [
            {
                model: Category,
                as: "category",
                where: categoryFilter,
                attributes: ["name"]
            }
        ],
        attributes: ["id", "name", "price", "stock", "categoryId"],
        limit,
        offset
    });

    return {
        data: products.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            stock: p.stock,
            category_name: p.category.name
        })),
        pagination: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / limit)
        }
    };
}

export default {
    create,
    search
}
