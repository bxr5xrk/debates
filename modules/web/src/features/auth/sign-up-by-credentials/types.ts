import { User } from "@/entities/user";
import { BaseResponse } from "@/shared/types";

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
  nickname: string;
}

export type SignUpData = BaseResponse<User>