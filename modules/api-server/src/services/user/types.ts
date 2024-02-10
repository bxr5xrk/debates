import { User } from "db/models/user";

export type CreateUserPayload = Pick<User, "email" | "password" | "name" | "nickname">;

export type UpdateUserPayload =  Pick<User, "name" | "nickname">;