import { User } from "db/models/user.entity";

export type CreateUserPayload = Pick<User, "email" | "password" | "name" | "nickName">;

export type UpdateUserPayload =  Pick<User, "name" | "nickName">;