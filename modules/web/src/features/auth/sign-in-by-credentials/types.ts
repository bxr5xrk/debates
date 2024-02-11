import { User } from "@/entities/user";
import { BaseResponse } from "@/shared/types";

export interface SignInPayload {
  email: string;
  password: string;
}

export type SignInData = BaseResponse<User>