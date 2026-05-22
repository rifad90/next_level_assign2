import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";
import { authController } from "../auth/auth.controller";


const router = Router();

router.post("/signup", userController.createUser);
router.post("/login", authController.loginUser);


export const userRouter = router;