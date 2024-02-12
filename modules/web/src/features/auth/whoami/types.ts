import { User } from "@/entities/user";
import { BaseResponse } from "@/shared/types";

export type WhoamiData = BaseResponse<Pick<User, 'email' | 'id'>>;

export type WhoamiPayload = void;