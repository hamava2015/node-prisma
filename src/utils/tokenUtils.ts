import jwt from 'jsonwebtoken';
import config from '../config/config';

export const GetToken = ({ user_id, username }: any) => {
    return jwt.sign({ user_id, username }, config.server.token.secret, { expiresIn: config.server.token.expireTime });
}
