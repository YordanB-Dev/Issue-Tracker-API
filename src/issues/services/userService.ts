import userRepository from "../repositories/userRepository.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt"
import Jwt  from "jsonwebtoken";

interface User {
    id: number,
    email: string,
    password: string,
    username: string;
};

const register = async (email: string, password: string, username: string) => {

    if (!email?.trim() || !password?.trim() || !username?.trim()) {
        throw new AppError("Missing required fields", 404);
    };

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        throw new AppError("This email already in use", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hashedPassword, username);

    return {
        id: user.id,
        email: user.email
    };
};

const login = async(email: string, password: string) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new AppError("User not found", 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError("Incorect password", 400);
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new AppError(`JWT_SECRET is not defiend`, 500);
    }

    const token = Jwt.sign(
        {id: user.id, email: user.email},
        secret,
        {expiresIn: "12h"}
    );

    return {
        token,
        user: {id: user.id, email: user.email}
    };
};

export default {
    register,
    login
};