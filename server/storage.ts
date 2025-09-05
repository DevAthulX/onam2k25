import { randomUUID } from "crypto";
import {
  type User,
  type InsertUser,
  type NameValidation,
  type InsertNameValidation,
} from "../shared/schema.js"; // ✅ fixed alias + added .js

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Name validation methods
  getNameValidation(name: string): Promise<NameValidation | undefined>;
  createNameValidation(
    validation: InsertNameValidation
  ): Promise<NameValidation>;
  getNameValidationsBySession(sessionId: string): Promise<NameValidation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private nameValidations: Map<string, NameValidation>;

  constructor() {
    this.users = new Map();
    this.nameValidations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getNameValidation(name: string): Promise<NameValidation | undefined> {
    return Array.from(this.nameValidations.values()).find(
      (validation) => validation.name.toLowerCase() === name.toLowerCase()
    );
  }

  async createNameValidation(
    insertValidation: InsertNameValidation
  ): Promise<NameValidation> {
    const id = randomUUID();
    const validation: NameValidation = {
      ...insertValidation,
      id,
      createdAt: new Date(),
      sessionId: insertValidation.sessionId ?? null, // ✅ no undefined
    };
    this.nameValidations.set(id, validation);
    return validation;
  }

  async getNameValidationsBySession(
    sessionId: string
  ): Promise<NameValidation[]> {
    return Array.from(this.nameValidations.values()).filter(
      (validation) => validation.sessionId === sessionId
    );
  }
}

export const storage = new MemStorage();
