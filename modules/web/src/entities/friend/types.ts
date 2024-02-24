import { User } from "../user";
import { BaseResponse } from "@/shared/types";

export interface Friend {
  id: number;
  friend: User;
}

export type Friends = BaseResponse<Friend[]>;
