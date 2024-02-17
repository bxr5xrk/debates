import { User } from "@/entities/user";
import { BaseResponse } from "@/shared/types";

export interface SignUpPayload {
  image: File;
  email: string;
  password: string;
  name: string;
  surname: string;
  nickname: string;
}

export type SignUpData = BaseResponse<User>