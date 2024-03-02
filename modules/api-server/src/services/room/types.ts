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

export interface WinsAndLossesChartData {
  date: string,
  wins: number,
  losses: number
}

export interface UserAndFriendWinsChartData {
  date: string,
  userWins: number,
  friendWins: number
}

export interface ParticipationsChartData {
  date: string,
  participationsNumber: number,
}
