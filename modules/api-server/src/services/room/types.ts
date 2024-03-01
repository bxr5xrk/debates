import { Room } from "db/models/room";

export interface CreateRoomPayload {
  topic: string;
  judgeId: number;
  proTeamIds: number[];
  conTeamIds: number[];
  reportTime: number;
  reportsNumber: number;
} 

export interface Pagination {
  data: Room[],
  pagesCount: number,
  currentPage: number
}
