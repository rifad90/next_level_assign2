import { pool } from "../../db";
import type { IIssue } from "./issues.interface";


const createIssue = async (issue: IIssue, user_id: string) => {
    const { title, description, type } = issue;
    const status = "open";
    try {
        const result = await pool.query(`INSERT INTO issues 
            (title, description,type, status, reporter_id) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [title, description, type, status, user_id]);

        return result;
    } catch (error: any) {
        throw new Error("Failed to create issue: " + error.message);
    }
}

const getALLIssues = async ({ sort, type, status }: { sort: string, type: string, status: string }) => {
    if (sort) {
        sort = sort.toLowerCase() === "newest" ? "DESC" : "ASC";
    } else {
        sort = "DESC";
    }
    //  console.log(sort, type, status);
    let query = `SELECT issues.*, users.name, users.email FROM issues join users on issues.reporter_id = users.id`;
    const values: any[] = [];

    if (type) {
        query += ` AND type = $1`;
        values.push(type);
    }
    if (status) {
        query += ` AND status = $2`;
        values.push(status);
    }
    if (sort) {
        query += ` ORDER BY issues.created_at ${sort}`;
    }
    // console.log(query, values);

    try {
        const result = await pool.query(query, values);
        const results = [];
        for (const row of result.rows) {
            const { id, title, description, type, status, reporter_id, created_at, updated_at, name, email } = row;
            results.push({
                id,
                title,
                description,
                type,
                status,
                "reporter": {
                    id: reporter_id,
                    name: name,
                    email: email
                },
                created_at,
                updated_at
            });
        }


        return results;
    } catch (error: any) {
        throw new Error("Failed to retrieve issues: " + error.message);
    }
}

const getIssueById = async (id: string) => {
    try {
        const result = await pool.query(`SELECT issues.*, users.name, users.email FROM issues join users on issues.reporter_id = users.id WHERE issues.id = $1`, [id]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        const { title, description, type, status, reporter_id, created_at, updated_at, name, email } = row;
        return {
            id,
            title,
            description,
            type,
            status,
            "reporter": {
                id: reporter_id,
                name: name,
                email: email
            },
            created_at,
            updated_at
        };
    } catch (error: any) {
        throw new Error("Failed to retrieve issue: " + error.message);
    }
}

export const issuesService = {
    createIssue,
    getALLIssues,
    getIssueById
}
