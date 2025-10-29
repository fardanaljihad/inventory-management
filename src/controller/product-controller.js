import productService from "../service/product-service.js";

const create = async (req, res, next) => {
    try {
        const createdBy = req.user.email;
        req.body.createdBy = createdBy;
        const response = await productService.create(req.body);
        res.status(200).json({
            data: response
        })
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const request = {
            name: req.query.name,
            categoryName: req.query.category_name,
            page: req.query.page,
            size: req.query.size
        };
        const response = await productService.search(request);
        res.status(200).json({
            data: response.data,
            pagination: response.pagination
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await productService.get(id);
        res.status(200).json({
            data: response
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const id = req.params.id;
        const modifiedBy = req.user.email;
        req.body.modifiedBy = modifiedBy;
        const response = await productService.update(id, req.body);
        res.status(200).json({
            data: response
        })
    } catch (e) {
        next(e);
    }
}

const del = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedBy = req.user.email;
        const response = await productService.del(id, deletedBy);
        res.status(200).json({
            data: response
        })
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    search,
    get,
    update,
    del
}
