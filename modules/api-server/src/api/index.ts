import { FastifyInstance } from "fastify";
import * as user from "./handlers/user";

export async function applicationApi(server: FastifyInstance): Promise<void> {
  server.get("/users", user.getUsers);
  server.get("/users/:id", user.getUser);
  server.post("/users", user.createUser);
  server.put("/users/:id", user.updateUser);
}