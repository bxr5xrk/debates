import { db } from "connectors/db";
import { User } from "db/models/user";
import { CreateUserPayload, UpdateUserPayload } from "./types";
import { In } from "typeorm";
import { UserWithoutPassword } from "globals";

class UserService {
  private userRepository = db.getRepository(User);
  public async getUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error("Email is required");
    }

    const user = await this.userRepository.findOneBy({
      email
    })

    return user;
  }

  public async getUserByNickname(nickname?: string): Promise<User | null> {
    if (!nickname) {
      throw new Error("Nickname is required");
    }

    const user = await this.userRepository.findOneBy({
      nickname
    })

    return user;
  }

  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async getUserById(id?: number): Promise<UserWithoutPassword | null> {
    if (!id) {
      throw new Error("Id is required");
    }

    const user = await this.userRepository.findOneBy({
      id
    })

    if (!user) {
      throw new Error("User not found");
    }

    const { password: savedPassword, ...rest } = user;

    return rest;
  }

  public async getUsersByIds(ids: number[]): Promise<User[]> {
    if (!ids) {
      throw new Error("Ids are required");
    }

    const users = await this.userRepository.find({ where: { id: In(ids) } });

    return users;
  }

  public async createUser(user: CreateUserPayload): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  public async updateUser(id: number, user: UpdateUserPayload): Promise<UserWithoutPassword | undefined> {
    try {
      if (!id) {
        throw new Error("Id is required");
      }

      const existingUser = await this.userRepository.findOneBy({ id })

      if (!existingUser) {
        throw new Error("User not found");
      }

      const updatedUser = this.userRepository.merge(existingUser, user);
      const newUser = await this.userRepository.save(updatedUser);

      const { password: savedPassword, ...rest } = newUser;

      return rest;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export const userService = new UserService();