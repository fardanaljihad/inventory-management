import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import categoryController from "../controller/category-controller.js";
import productController from "../controller/product-controller.js";

const userRouter = express.Router();
userRouter.use(authMiddleware);
userRouter.post('/register', userController.register);

const categoryRouter = express.Router();
categoryRouter.use(authMiddleware);
categoryRouter.post('/categories', categoryController.create);
categoryRouter.get('/categories', categoryController.search);
categoryRouter.get('/categories/:id', categoryController.get);
categoryRouter.put('/categories/:id', categoryController.update);
categoryRouter.delete('/categories/:id', categoryController.del);

const productRouter = express.Router();
productRouter.use(authMiddleware);
productRouter.post('/products', productController.create);
productRouter.get('/products', productController.search);

export {
    userRouter,
    categoryRouter,
    productRouter
}
