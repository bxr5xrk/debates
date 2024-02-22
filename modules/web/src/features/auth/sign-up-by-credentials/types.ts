import { User } from "@/entities/user";
import { BaseResponse } from "@/shared/types";

export interface SignUpPayload {
  image: File;
  name: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type SignUpData = BaseResponse<User>