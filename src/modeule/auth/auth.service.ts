import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config/config";


const loginUserService = async (email: string, password: string) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (result.rows.length === 0) {
            throw new Error("User not found");
        }
        const user = result.rows[0];
        console.log("User found:", user);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {

            throw new Error("Invalid credentials");

        }
        delete result.rows[0].password;
        const jwtPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
        const accessToken = jwt.sign(jwtPayload, config.secret!, {
            expiresIn: '1d'
        });
        return {
            token: accessToken,
            user: result.rows[0]
        };
    } catch (error: any) {
        throw new Error("Failed to login user: " + error.message);
    }
}

export const authService = {
    loginUserService
}