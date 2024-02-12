import { FastifyInstance } from "fastify";
import * as user from "./handlers/user";
import * as auth from "./handlers/auth";
import * as friend from "./handlers/friend";
import { authMiddleware } from "./middleware/authorization";

export async function applicationApi(server: FastifyInstance): Promise<void> {
  server.addHook("onRequest", authMiddleware);

  server.get("/users", user.getUsers);
  server.get("/users/:id", user.getUser);
  server.post("/users", user.createUser);
  server.put("/users/:id", user.updateUser);
  server.get("/friends/get-received-invites/:userId", friend.getReceivedInvites);
  server.get("/friends/get-sent-invites/:userId", friend.getSentInvites);
  server.post("/friends/send-invite", friend.sendInvite);
  server.put("/friends/accept-invite/:id", friend.acceptInvite);
  server.put("/friends/reject-invite/:id", friend.rejectInvite);
  server.get("/friends/get-all/:userId", friend.getFriends);
  server.delete("/friends/delete", friend.deleteFriend);
}

export async function authApi(server: FastifyInstance): Promise<void> {
  server.post("/auth/sign-up", auth.signUp);
  server.post("/auth/sign-in", auth.signIn);
  server.get("/auth/whoami", auth.whoami);
  server.post("/auth/sign-out", auth.signOut);
}

