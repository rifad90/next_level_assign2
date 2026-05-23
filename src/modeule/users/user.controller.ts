import type { Request, Response } from "express"
import { userService } from "./user.service";
import type { IUser } from "./user.interface";




const createUser = async (req: Request, res: Response) => {
    const user: IUser = req.body;
    if (user.role !== "contributor" && user.role !== "maintainer") {
        return res.status(400).json({
            status: false,
            message: "Invalid role. Role must be either 'contributor' or 'maintainer'."
        });
    }
    console.log(user);
    try {
        const result = await userService.createUserService(user);
        if (result.rows.length > 0) {
            res.status(201).json({
                status: true,
                message: 'User created successfully',
                data: result.rows[0]
            });
        } else {
            res.status(400).json({
                status: false,
                message: 'Failed to create user',
                error: result
            });
        }
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: error.message,
            error: error
        });
        return;
    }


}


export const userController = {
    createUser
}