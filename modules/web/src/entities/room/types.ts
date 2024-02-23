import { User } from "../user";

export enum RoomStatusEnum {
  PENDING = 'pending',
  STARTED = 'started',
  ENDED = 'ended',
}

export interface Room {
  gradingTime: number;
  conTeam: User[];
  proTeam: User[];
  code: string;
  reportTime: number;
  judge: User;
  members: User[];
  owner: User;
  preparationTime: number;
  winners: User[];
  topic: string;
  id: number;
  status: RoomStatusEnum;
  createdAt: string;
  updatedAt: string;
}
