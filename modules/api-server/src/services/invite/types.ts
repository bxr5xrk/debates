import { Invite } from "db/models/invite";

export type CreateInvitePayload = Pick<Invite, "sender" | "receiver" | "type" >;

export type UpdateInvitePayload = Pick<Invite, "status">;