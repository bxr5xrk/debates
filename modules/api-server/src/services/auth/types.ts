import { User } from "db/models/user";

export type SignUpPayload = Pick<User, "email" | "password" | "name" | "nickname">;

export type UserWithoutPassword = Omit<User, "password">;

export type SignInPayload = Pick<User, "email" | "password">;