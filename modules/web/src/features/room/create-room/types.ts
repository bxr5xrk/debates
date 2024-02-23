import { Room } from "@/entities/room";
import { BaseResponse } from "@/shared/types";

export interface CreateRoomPayload {
  topic: string;
  judgeId: number;
  proTeamIds: number[];
  conTeamIds: number[];
  preparationTime: number;
  reportTime: number;
  gradingTime: number;
}

export interface CreateRoomFormData {
  topic: string;
  judgeId: string;
  proTeamIds: string;
  conTeamIds: string;
  preparationTime: number;
  reportTime: number;
  gradingTime: number;

}

export type CreateRoomData = BaseResponse<Room>;