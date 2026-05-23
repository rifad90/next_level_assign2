import type { Request, Response } from "express";
import { issuesService } from "./issues.service";


const createIssue = async (req: Request, res: Response) => {
    try {
        //  console.log(req.body);
        //  console.log(req.user);
        const { id, name, email, role } = req.user;
        const { title, description, type, status } = req.body;
        if (description.length < 20) {
            return res.status(400).json({
                status: false,
                message: "Description should not be less than 20 characters"
            });
        }
        const result = await issuesService.createIssue(req.body, id);
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
        res.status(500).json({
            status: false,
            message: "Failed to create issue: " + error.message,
            error: error
        });
    }
}
const getALLIssues = async (req: Request, res: Response) => {
    // const { id, name, email, role } = req.user;
    const { sort, type, status } = req.headers;
    console.log(sort, type, status);
    try {
        const result = await issuesService.getALLIssues({ sort: sort as string, type: type as string, status: status as string });
        if (result.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No issues found"

            });
        }

        res.status(200).json({
            status: true,
            //message: "Issue re successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: "Failed to get issues: " + error.message,
            error: error
        });
    }
}

const getIssueById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await issuesService.getIssueById(id);
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Issue not found"

            });
        }

        res.status(200).json({
            status: true,
            //message: "Issue re successfully",
            data: result
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: "Failed to get issue: " + error.message,
            error: error
        });
    }
}

export const issuesController = {
    createIssue,
    getALLIssues,
    getIssueById
} 