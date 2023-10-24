import jwt from "jsonwebtoken";
import config from "../config/config";
import { NextFunction, Request, Response } from 'express';

const auth = (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Not Authorized.")
        }
        jwt.verify(token, config.server.token.secret, (err: any, user: any) => {
            if (err) {
                return res.status(403).send("Access denied.")
            }
            req.user = user;
            next();
        });

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}

export default auth;
