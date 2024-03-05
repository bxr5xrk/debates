import { BaseResponse } from "@/shared/types";
import { User } from "../user";

export enum RoomStatusEnum {
  PENDING = 'pending',
  STARTED = 'started',
  PAUSED = 'paused',
  GRADING = 'grading',
  ENDED = 'ended',
}

export interface Room {
  gradingTime: number;
  notGraded: boolean;
  conTeam: User[];
  proTeam: User[];
  reportTime: number;
  judge: User;
  members: User[];
  owner: User;
  reportsNumber: number;
  winners: User[];
  topic: string;
  id: number;
  status: RoomStatusEnum;
  createdAt: string;
  updatedAt: string;
  isPublic: true;
}

export type RoomValidData = BaseResponse<Room>;

export type RoomData = BaseResponse<Room>;

export type RoomsData = BaseResponse<Room[]>;