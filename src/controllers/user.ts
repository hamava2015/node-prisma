import { NextFunction, Request, Response } from 'express';
import { signup, login } from '../services/userService';
import { PrismaClient, Prisma, Equipment } from '@prisma/client'

const NAMESPACE = 'User';
const prisma = new PrismaClient();

const signupUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { username, password } = req.body;
        const result = await signup(username, password);
        const { password: userPassword, ...resultWithoutPassword } = result;
        res.status(201).json(resultWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Internal error', error });
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { username, password } = req.body;
        const user = await login(username, password);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            res.status(200).json({ message: 'Login successful', userWithoutPassword });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal error', error });
    }
};

export default { signupUser, loginUser };
