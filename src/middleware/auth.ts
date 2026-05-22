import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { pool } from "../db";

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            // console.log(req.headers);
            console.log("From auth middleware");
            if (!token) {
                return res.status(401).json({
                    status: false,
                    message: "Unauthorized"
                });
            }
            const decodedToken = jwt.verify(token, config.secret as string) as JwtPayload;

            const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [decodedToken.email]);

            if (!result.rows[0]) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }
            console.log(result.rows[0]);
            const user = result.rows[0];
            req.user = user;
            next();
        } catch (error: any) {
            next(error);
        }
    }
}

export default auth;