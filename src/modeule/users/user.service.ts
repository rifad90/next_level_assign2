import type { Request, Response } from "express"
import type { IUser } from "./user.interface"
import { pool } from "../../db";
import bcrypt from "bcryptjs";


const createUserService = async (user: IUser) => {
    const { name, email, password, role } = user;
    const hashedPassword = await bcrypt.hash(password, 10);;
    try {
        const result = await pool.query(`INSERT INTO users 
            (name, email, password, role) 
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, hashedPassword, role]);

        delete result.rows[0].password;
        return result;
    } catch (error: any) {
        throw new Error("Failed to create user: " + error.message);
    }
}


export const userService = {
    createUserService,
}