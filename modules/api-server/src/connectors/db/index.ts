import { Friend } from "db/models/friend.entity";
import { Invite } from "db/models/invite.entity";
import { User } from "db/models/user.entity";
import { ENV } from "platform/env";
import { DataSource } from "typeorm";

export const db = new DataSource({
  url: ENV.PG.CONNECTION_STRING,
  type: "postgres",
  ssl: true,
  synchronize: true,
  logging: true,
  entities: [User, Friend, Invite],
});
