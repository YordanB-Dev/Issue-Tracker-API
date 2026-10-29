import type { QueryResult } from "pg";
import pool from "../../db.js";


interface User {
    id: number,
    user_id: number,
    email: string,
    password: string,
    username: string;
}

const createUser = async (
    email: string,
    password: string,
    username: string
): Promise<User> => {
    const result: QueryResult<User> = await pool.query (
        `INSERT INTO users (email, password, username) VALUES ($1, $2, $3)
        RETURNING *`,
        [email, password, username]
    );

    return result.rows[0]!;
};

const findUserByEmail = async (email: string): Promise<User> => {
    const result: QueryResult<User> = await pool.query (
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return result.rows[0]!;
};

export default {
    createUser,
    findUserByEmail
};