import { User } from "db/models/user.entity";

export type CreateUserPayload = Pick<User, "email" | "password" | "name" | "nickname">;

export type UpdateUserPayload = Partial<Pick<User, "name" | "nickname">>;