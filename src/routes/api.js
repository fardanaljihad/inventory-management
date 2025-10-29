import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import categoryController from "../controller/category-controller.js";

const userRouter = express.Router();
userRouter.use(authMiddleware);
userRouter.post('/register', userController.register);

const categoryRouter = express.Router();
categoryRouter.use(authMiddleware);
categoryRouter.post('/categories', categoryController.create);

export {
    userRouter,
    categoryRouter
}
