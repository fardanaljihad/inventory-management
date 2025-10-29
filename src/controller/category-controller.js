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

export default {
    create
}