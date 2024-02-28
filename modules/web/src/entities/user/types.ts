import { BaseResponse } from "@/shared/types";

export interface User {
  id: number;
  email: string;
  name: string;
  nickname: string;
  picture?: string;
  createdAt: string;
  updatedAt: string;
}

export type Me = BaseResponse<User>;

export interface UserFormData {
  name?: string;
  nickname?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}