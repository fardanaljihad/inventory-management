import categoryService from "../service/category-service.js";

const create = async (req, res, next) => {
    try {
        const createdBy = req.user.email;
        req.body.createdBy = createdBy;
        const response = await categoryService.create(req.body);
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
            page: req.query.page,
            size: req.query.size
        };
        const response = await categoryService.search(request);
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
        const response = await categoryService.get(id);
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
    get
}