import type { QueryResult } from "pg";
import pool from "../../db.js"


export interface Issue {
    id: number,
    user_id: number,
    created_by: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    assigned_to: number | null,
    created_at: Date,
    due_date: Date;
}

interface updateTaskData {
    title?: string,
    description?: string,
    status?: string,
    priority?: string,
    due_date?: Date;
}

export const issuseRepository = {
    async getAllIssues(user_id: number, status?: string, priority?: string) {
        const result: QueryResult<Issue> = await pool.query<Issue> (
            `SELECT * FROM issues WHERE user_id = $1
            AND ($2 IS NULL OR status = $2)
            AND ($3 IS NULL OR priority = $3)`,
            [user_id, status ?? null, priority ?? null]
        );

        return result.rows;
    },


    async getIssuesById(id: number, user_id: number) {
        const result: QueryResult<Issue> = await pool.query<Issue> (
            `SELECT * FROM issues WHERE id = $1 AND user_id = $2`,
            [id, user_id]
        );

        return result.rows[0];
    },

    async createIssue(
        title: string,
        description: string,
        status: string,
        priority: string,
        created_by: number,
        assigned_to: number | null
    ) {
        const result: QueryResult<Issue> = await pool.query<Issue> (
            `INSERT INTO issues (title, description, status, priority, created_by, assigned_to)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [title, description, status, priority, created_by, assigned_to ?? null]
        );

        return result.rows[0];
    },


    async updateIssue(user_id: number, id: number, data: updateTaskData) {
        const result: QueryResult<Issue> = await pool.query<Issue> (
            `UPDATE issues SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            status = COALESCE($3, status),
            priority = COALESCE($4, priority),
            due_date = COALESCE($5, due_date)
            WHERE id = $6 AND user_id = $7
            RETURNING *`,
            [
                data.title ?? null,
                data.description ?? null,
                data.status ?? null,
                data.priority ?? null,
                data.due_date ?? null,
                id,
                user_id
            ]
        );

        return result.rows[0];
    },


    async deleteIssue(user_id: number, id: number) {
        const result: QueryResult<Issue> = await pool.query<Issue> (
            `DELETE FROM issues WHERE id = $1 AND user_id = $2 RETURNING *`,
            [id, user_id]
        );

        return result.rows[0];
    }
};

export default issuseRepository;