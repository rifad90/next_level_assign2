import { pool } from "../../db";
import type { IIssue } from "./issues.interface";


const createIssue = async (issue: IIssue) => {
    const { title, description, type, reporter_id } = issue;
    const status = "open";
    try {
        const result = await pool.query(`INSERT INTO issues 
            (title, description,type, status, reporter_id) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, description, type, status, reporter_id]);

        return result;
    } catch (error: any) {
        throw new Error("Failed to create issue: " + error.message);
    }
}

export const issuesService = {
    createIssue,
}