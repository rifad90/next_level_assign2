import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";


const router = Router();

router.post("/", auth(), issuesController.createIssue);
router.get("/", issuesController.getALLIssues);
router.get("/:id", issuesController.getIssueById);
router.patch("/:id", auth(), issuesController.updateIssueById);
router.delete("/:id", auth(), issuesController.deleteIssueById);


export const issuesRouter = router;