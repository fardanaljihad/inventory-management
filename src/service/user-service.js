import { loginUserValidation, registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import db from '../../models/index.js';
import { generateToken } from "../auth/jwt.js";

const { User } = db;

const register = async (request, createdBy) => {
    const user = validate(registerUserValidation, request);

    const countUser = await User.count({
        where: {
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists")
    }

    user.password = await bcrypt.hash(user.password, 10);
    user.created_by = createdBy;
    const newUser = await User.create(user);

    return {
        name: newUser.name,
        email: newUser.email
    };
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await User.findOne({
        where: {
            email: loginRequest.email
        },
        attributes: ['name', 'email', 'password']
    });

    if (!user) {
        throw new ResponseError(401, "Email or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password wrong");
    }

    const token = generateToken(user);

    await User.update(
        { token: token },
        { where: { email: user.email } }
    );

    return {token};
}

export default {
    register,
    login
}
