import { Friend } from "db/models/friend";

export type CreateFriendPayload = Pick<Friend, "user" | "friend" | "invite">;