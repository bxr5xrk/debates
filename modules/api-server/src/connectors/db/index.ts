import { Friend } from "db/models/friend";
import { Invite } from "db/models/invite";
import { User } from "db/models/user";
import { ENV } from "platform/env";
import { DataSource } from "typeorm";

export const db = new DataSource({
  type: "postgres",
  host: ENV.PG.HOST,
  port: ENV.PG.PORT,
  username: ENV.PG.USER,
  password: ENV.PG.PASSWORD,
  database: ENV.PG.DATABASE,
  synchronize: true,
  logging: true,
  entities: [User, Friend, Invite],
});
