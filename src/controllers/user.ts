import { NextFunction, Request, Response } from 'express';
import { signup, login } from '../services/userService';
import { PrismaClient, Prisma, Equipment } from '@prisma/client';
import { GetToken } from '../utils/tokenUtils';
import logging from '../config/logging';


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
            const { user_id, username, name } = userWithoutPassword;
            const token = GetToken({ user_id, username });
            return res.status(200).json({ message: 'Login successful', token, user_id, username, name });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal error', error });
    }
};

const invalidateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized.');

    // we are not saving tokens. So, this is dummy. We clear the token in user side (e.g. Postman)
    return res.status(200).json({
        message: 'Token invalidated'
    });
};


export default { signupUser, loginUser, invalidateToken };
