import { User } from "@/entities/user";
import { BaseResponse } from "@/shared/types";

export type Whoami = Pick<User, 'email' | 'id' | "nickname">

export type WhoamiData = BaseResponse<Whoami>;

export type WhoamiPayload = void;