import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../../config';

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            if (err) reject(err);
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
};

export const checkPassword = (password, hash) => {
    return bcrypt.compare(password, hash);
};

export const getToken = (id) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ id }, config.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) reject(err);
            resolve(token);
        });
    });
};

export const verifyToken = (token) => {
    return jwt.verify(token, config.JWT_SECRET);
};
