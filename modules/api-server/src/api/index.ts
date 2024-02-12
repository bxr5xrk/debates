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
  server.get("/friends/received-invites", friend.getReceivedInvites);
  server.get("/friends/sent-invites", friend.getSentInvites);
  server.get("/friends/invite/:id", friend.getInvite);
  server.post("/friends/send-invite/:userId", friend.sendInvite);
  server.put("/friends/accept-invite/:id", friend.acceptInvite);
  server.put("/friends/reject-invite/:id", friend.rejectInvite);
  server.get("/friends", friend.getFriends);
  server.get("/friends/:id", friend.getFriend);
  server.delete("/friends/:id", friend.deleteFriend);
}

export async function authApi(server: FastifyInstance): Promise<void> {
  server.post("/auth/sign-up", auth.signUp);
  server.post("/auth/sign-in", auth.signIn);
  server.get("/auth/whoami", auth.whoami);
  server.post("/auth/sign-out", auth.signOut);
}

