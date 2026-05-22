import type { Request, Response } from "express";
import { issuesService } from "./issues.service";


const createIssue = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        //const { title, description, status, priority, assigned_to } = req.body;
        const result = await issuesService.createIssue(req.body);
        if (result.rowCount === 0) {
            return res.status(400).json({
                status: false,
                message: "Failed to create issue"

            });
        }

        res.status(201).json({
            status: true,
            message: "Issue created successfully",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({ error: "Failed to create issue: " + error.message });
    }
}

export const issuesController = {
    createIssue,
} 