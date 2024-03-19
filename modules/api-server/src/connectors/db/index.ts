import { Friend } from "db/models/friend";
import { Invite } from "db/models/invite";
import { Like } from "db/models/like";
import { Room } from "db/models/room";
import { User } from "db/models/user";
import { ENV } from "platform/env";
import { DataSource } from "typeorm";

export const db = new DataSource({
  url: ENV.PG.CONNECTION_STRING,
  type: "postgres",
  ssl: true,
  synchronize: true,
  logging: true,
  entities: [User, Friend, Invite, Room, Like],
});
