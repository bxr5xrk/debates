import { Room } from "@/shared/types";
import { BaseResponse } from "@/shared/types";

export interface CreateRoomPayload {
  topic: string;
  judgeId: number;
  proTeamIds: number[];
  conTeamIds: number[];
  reportTime: number;
  reportsNumber: number;
}

export interface CreateRoomFormData {
  topic: string;
  judgeId: string;
  proTeamIds: {
    id: string;
  }[];
  conTeamIds: {
    id: string;
  }[];
  reportTime: number;
  reportsNumber: number;
}

export type CreateRoomData = BaseResponse<Room>;