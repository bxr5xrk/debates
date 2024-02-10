import { User } from "db/models/user";

export type CreateUserPayload = Pick<User, "email" | "password" | "name" | "nickName">;

export type UpdateUserPayload =  Pick<User, "name" | "nickName">;