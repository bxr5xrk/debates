import { BaseResponse } from "@/shared/types";
import { Invite, InviteTypeEnum } from "..";

export interface InviteSendPayload {
  nickname: string;
  type: InviteTypeEnum
}

export type InviteSendData = BaseResponse<Invite>
