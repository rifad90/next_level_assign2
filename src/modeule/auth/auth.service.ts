import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";


const loginUserService = async (email: string, password: string) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (result.rows.length === 0) {
            throw new Error("User not found");
        }
        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {

            throw new Error("Invalid credentials");

        }
        const jwtPayload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
        const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY!, {
            expiresIn: '1d'
        });
        return {
            accessToken
        };
    } catch (error: any) {
        throw new Error("Failed to login user: " + error.message);
    }
}

export const authService = {
    loginUserService
}