import { Friend } from "db/models/friend";
import { Invite } from "db/models/invite";
import { User } from "db/models/user";
import { ENV } from "platform/env";
// import { ENV } from "platform/env";
import { DataSource } from "typeorm";
// import mysql from "mysql2";
// import sqlite3 from "@libsql/sqlite3";

// ? postgres neon
// export const db = new DataSource({
//   url: ENV.PG.CONNECTION_STRING,
//   type: "postgres",
//   ssl: true,
//   synchronize: true,
//   logging: true,
//   entities: [User, Friend, Invite],
// });

// ? postgres local
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

// ? sqllite turso
// export const db = new DataSource({
//   type: "sqlite",
//   driver: sqlite3,
//   flags: 0x00000040,
//   database: "libsql://debates-bxr5xrk.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MDc4MzE3NzQsImlkIjoiNmY1MGUwZWMtY2E3NS0xMWVlLWI5N2YtNmFiZWQzNDc4NmU4In0._2mTJIinHO7g6zmfHKWh3Z-V2xeYdA2OzQ-D3oRSV7AVSupjSLRVG74kT1fQ6Ukjp8b-e21P94VFgld0NUIOAA",
//   synchronize: true,
//   logging: true,
//   entities: [User, Friend, Invite]
// });

// ! move to env
// const DATABASE_URL = 'mysql://2xm618bc1jrma7wnzuia:pscale_pw_bDWlGpm2VzTrDE0oXpc1f4qdJ6TtcjoinvbqKQr1BHg@aws.connect.psdb.cloud/debates?ssl={"rejectUnauthorized":true}';

// ? mysql planetscale
// export const db = new DataSource({
//   url: DATABASE_URL,
//   type: "mysql",
//   ssl: {
//     rejectUnauthorized: true,
//   },
//   synchronize: true,
//   logging: true,
//   entities: [User, Invite, Friend],
// });

