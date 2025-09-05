import { Pool } from "pg";
import { randomUUID } from "crypto";
import {
  type User,
  type InsertUser,
  type NameValidation,
  type InsertNameValidation,
} from "../shared/schema.js";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Railway URL
});

export class DbStorage {
  async getUser(id: string): Promise<User | undefined> {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const res = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return res.rows[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const res = await pool.query(
      "INSERT INTO users (id, username, email) VALUES ($1, $2, $3) RETURNING *",
      [id, insertUser.username, insertUser.email]
    );
    return res.rows[0];
  }

  async getNameValidation(name: string): Promise<NameValidation | undefined> {
    const res = await pool.query("SELECT * FROM name_validations WHERE LOWER(name) = LOWER($1)", [name]);
    return res.rows[0];
  }

  async createNameValidation(insertValidation: InsertNameValidation): Promise<NameValidation> {
    const id = randomUUID();
    const res = await pool.query(
      "INSERT INTO name_validations (id, name, created_at, session_id) VALUES ($1, $2, NOW(), $3) RETURNING *",
      [id, insertValidation.name, insertValidation.sessionId ?? null]
    );
    return res.rows[0];
  }

  async getNameValidationsBySession(sessionId: string): Promise<NameValidation[]> {
    const res = await pool.query("SELECT * FROM name_validations WHERE session_id = $1", [sessionId]);
    return res.rows;
  }
}

export const storage = new DbStorage();
