import { Room } from "@/entities/room";
import { BaseResponse } from "@/shared/types";

export interface CreateRoomPayload {
  topic: string;
  judgeId: number;
  proTeamIds: number[];
  conTeamIds: number[];
  reportTime: number;
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

}

export type CreateRoomData = BaseResponse<Room>;