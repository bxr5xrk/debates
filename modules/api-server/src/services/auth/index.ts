import { db } from "connectors/db";
import { User } from "db/models/user";
import { SignInPayload, SignUpPayload, UserWithoutPassword } from "./types";
import { compare, hash } from "bcrypt";

class AuthService {
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

  public async signUp(payload: SignUpPayload): Promise<UserWithoutPassword | undefined> {
    const { email, password, nickname } = payload;

    try {
      const existingEmail = await this.getUserByEmail(email);

      if (existingEmail) {
        throw new Error("User with this email already exists");
      }

      const existingNickname = await this.getUserByNickname(nickname);

      if (existingNickname) {
        throw new Error("User with this nickname already exists");
      }

      const hashedPassword = await hash(password, 10);

      const newUser = db.getRepository(User).create({
        ...payload,
        password: hashedPassword
      });

      const { password: savedPassword, ...rest } = await db.getRepository(User).save(newUser);

      return rest
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  public async signIn(payload: SignInPayload): Promise<UserWithoutPassword | undefined> {
    const { email, password } = payload;

    try {
      const user = await this.getUserByEmail(email);

      if (!user) {
        throw new Error("User with this email does not exist");
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      const { password: savedPassword, ...rest } = user;

      return rest;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export const authService = new AuthService();
