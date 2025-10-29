import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const createdBy = req.user.email;
        const response = await userService.register(req.body, createdBy);
        res.status(200).json({
            data: response
        })
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const response = await userService.login(req.body);
        res.status(200).json({
            data: response
        })
    } catch (e) {
        next(e);
    }
}

export default {
    register,
    login
}