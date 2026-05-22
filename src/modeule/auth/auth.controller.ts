import type { Request, Response } from "express";
import { authService } from "./auth.service";



const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const result = await authService.loginUserService(email, password);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Login successful',
                data: result
            });
        } else {
            res.status(401).json({
                status: false,
                message: 'Invalid email or password',
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

export const authController = {
    loginUser
}







