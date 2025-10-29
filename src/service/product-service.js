import { validate } from "../validation/validation.js";
import db from '../../models/index.js';
import { createProductValidation, getProductValidation, searchProductValidation, updateProductValidation } from "../validation/product-validation.js";
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

const get = async (id) => {
    id = validate(getProductValidation, id);

    const product = await Product.findOne({
        where: { id: id },
    });

    if (!product) {
        throw new ResponseError(404, "Product not found");
    }

    return product;
}

const update = async (id, request) => {

    const productId = validate(getProductValidation, id);

    const product = await Product.findOne({
        where: { id: productId },
    });

    if (!product) {
        throw new ResponseError(404, "Product not found");
    }

    request = validate(updateProductValidation, request);

    const countProduct = await Product.count({
        where: {
            name: request.name
        }
    });

    if (countProduct === 1) {
        throw new ResponseError(400, "Product already exists");
    }

    const data = {}
    if (request.name) {
        data.name = request.name;
    }
    if (request.price) {
        data.price = request.price;
    }
    if (request.stock) {
        data.stock = request.stock;
    }
    if (request.categoryId) {
        const countCategory = await Category.count({
            where: {
                id: request.categoryId
            }
        });

        if (countCategory !== 1) {
            throw new ResponseError(400, "Category not found")
        }

        data.categoryId = request.categoryId;
    }

    data.modified_by = request.modifiedBy;
    data.modified_at = new Date();

    await Product.update(
        data,
        {
            where: {
                id: productId
            },
        }
    );

    return Product.findOne({
        where: {
            id: productId
        },
        attributes: ["id", "name", "price", "stock", "categoryId", "modified_by", "modified_at"]
    });
}

export default {
    create,
    search,
    get,
    update
}
