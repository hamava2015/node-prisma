import bcryptjs from 'bcryptjs';
import { PrismaClient, Prisma, User } from '@prisma/client';
import logging from '../config/logging';

const prisma = new PrismaClient();

export const signup = async (username: string, password: string): Promise<User> => {
    try {
        const hash = await bcryptjs.hash(password, 10);
        const result = await prisma.user.create({
            data: {
                username,
                password: hash,
            },
        });

        return result;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            const msg = 'There is a unique constraint violation, a new user cannot be created with this username';
            logging.error('User', msg, error);
            throw error;
        } else {
            throw error;
        }
    }
};

export const login = async (username: string, password: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: { username },
    });

    if (!user) {
        return null;
    }

    const result = await bcryptjs.compare(password, user.password);

    if (result) {
        return user;
    }

    return null;
};
