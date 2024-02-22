import { BaseResponse } from "@/shared/types";
import { Invite } from "..";

export type InviteAcceptPayload = number;

export type InviteAcceptData = BaseResponse<Invite>