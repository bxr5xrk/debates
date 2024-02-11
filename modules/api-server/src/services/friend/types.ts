import { Friend } from "db/models/friend.entity";

export type CreateFriendPayload = Pick<Friend, "user" | "friend" | "invite">;