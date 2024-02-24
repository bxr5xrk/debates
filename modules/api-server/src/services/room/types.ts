import { Room } from "db/models/room";

export type CreateRoomPayload = Pick<Room, "topic" | "reportTime" | "reportsNumber" >;
