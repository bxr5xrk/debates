import { FastifyInstance } from "fastify";
import * as user from "./handlers/user";
import * as auth from "./handlers/auth";
import { authMiddleware } from "./middleware/authorization";

export async function applicationApi(server: FastifyInstance): Promise<void> {
  server.addHook("onRequest", authMiddleware);

  server.get("/users", user.getUsers);
  server.get("/users/:id", user.getUser);
  server.post("/users", user.createUser);
  server.put("/users/:id", user.updateUser);
}

export async function authApi(server: FastifyInstance): Promise<void> {
  server.post("/auth/sign-up", auth.signUp);
  server.post("/auth/sign-in", auth.signIn);
  server.get("/auth/whoami", auth.whoami);
  server.post("/auth/sign-out", auth.signOut);
}