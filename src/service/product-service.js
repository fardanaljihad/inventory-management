import { validate } from "../validation/validation.js";
import db from '../../models/index.js';
import { createProductValidation } from "../validation/product-validation.js";
import { ResponseError } from "../error/response-error.js";

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

export default {
    create
}
