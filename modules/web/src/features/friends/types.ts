import { User } from "@/entities/user";

export enum InviteStatusEnum {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface Invite {
  id: number;
  sender: User;
  receiver: User;
  status: InviteStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}