import { User } from "@/entities/user";

export interface CurrentTeamRes {
  currentTeamType: "proTeam" | "conTeam" | null;
  teamMembers: User[];
  isTeamMember: boolean;
}