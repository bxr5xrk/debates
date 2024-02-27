import { BaseResponse } from "@/shared/types";
import { Invite } from "..";

export interface InviteSendPayload {
  nickname: string;
}

export type InviteSendData = BaseResponse<Invite>
