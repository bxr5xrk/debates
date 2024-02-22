import { User } from "@/entities/user";

export enum InviteStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum InviteTypeEnum {
  FRIEND = 'friend',
  GAME = 'game',
}

export interface Friend {
  id: number;
  user: User;
}

export interface Invite {
  id: number;
  sender: User;
  receiver: User;
  type: InviteTypeEnum;
  status: InviteStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}