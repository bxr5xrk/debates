import { Invite } from "db/models/invite.entity";

export type CreateInvitePayload = Pick<Invite, "sender" | "receiver">;

export type UpdateInvitePayload = Pick<Invite, "status">;