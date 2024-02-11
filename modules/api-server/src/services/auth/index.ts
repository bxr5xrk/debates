import { SignInPayload, SignUpPayload, UserWithoutPassword } from "./types";
import { compare, hash } from "bcrypt";
import { userService } from "services/user";

class AuthService {
  public async signUp(payload: SignUpPayload): Promise<UserWithoutPassword | undefined> {
    const { email, nickname, password } = payload;

    try {
      const existingEmail = await userService.getUserByEmail(email);

      if (existingEmail) {
        throw new Error("User with this email already exists");
      }

      const existingNickname = await userService.getUserByNickname(nickname);

      if (existingNickname) {
        throw new Error("User with this nickname already exists");
      }

      const hashedPassword = await hash(password, 10);

      const { password: savedPassword, ...rest } = await userService.createUser({
        ...payload,
        password: hashedPassword
      });

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
      const user = await userService.getUserByEmail(email);

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
