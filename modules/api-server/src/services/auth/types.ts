import { User } from "db/models/user";

export type SignUpPayload = Pick<User, "email" | "password" | "name" | "nickname"> & Partial<Pick<User, "picture">>;

export type UserWithoutPassword = Omit<User, "password">;

export type SignInPayload = Pick<User, "email" | "password">;