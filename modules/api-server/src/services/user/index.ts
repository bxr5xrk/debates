import { db } from "connectors/db";
import { User } from "db/models/user";
import { CreateUserPayload, UpdateUserPayload } from "./types";

class UserService {
  public async getUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error("Email is required");
    }

    const user = await db.getRepository(User).findOneBy({
      email
    })

    return user;
  }

  public async getUserByNickname(nickname: string): Promise<User | null> {
    if (!nickname) {
      throw new Error("Username is required");
    }

    const user = await db.getRepository(User).findOneBy({
      nickname
    })

    return user;
  }

  public async getUsers(): Promise<User[]> {
    return db.getRepository(User).find();
  }

  public async getUserById(id: number): Promise<User | null> {
    if (!id) {
      throw new Error("Id is required");
    }

    const user = await db.getRepository(User).findOneBy({
      id
    })

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public async createUser(user: CreateUserPayload): Promise<User> {
    const newUser = db.getRepository(User).create(user);
    return db.getRepository(User).save(newUser);
  }

  public async updateUser(id: number, user: UpdateUserPayload): Promise<User> {
    if (!id) {
      throw new Error("Id is required");
    }

    const existingUser = await db.getRepository(User).findOneBy({
      id
    })

    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = db.getRepository(User).merge(existingUser, user);
    return db.getRepository(User).save(updatedUser);
  }
}

export const userService = new UserService();