import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";


const router = Router();

router.post("/", issuesController.createIssue);


export const issuesRouter = router;