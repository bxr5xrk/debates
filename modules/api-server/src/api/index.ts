import { FastifyInstance } from "fastify";
import * as user from "./handlers/user";
import * as auth from "./handlers/auth";
import * as friend from "./handlers/friend";
import * as room from "./handlers/room";
import * as invite from "./handlers/invite";
import { authMiddleware } from "./middleware/authorization";

export async function applicationApi(server: FastifyInstance): Promise<void> {
  server.addHook("onRequest", authMiddleware);

  server.get("/me", user.getUser);
  server.get("/user/:id", user.getUser);
  server.put("/user", user.updateUser);

  server.get("/invites/:id", invite.getInvite);
  server.put("/invites/:id/accept", invite.acceptInvite);
  server.put("/invites/:id/reject", invite.rejectInvite);
  server.post("/invites/send", invite.sendInvite);

  server.get("/friends", friend.getFriends);
  server.get("/friends/:id", friend.getFriend);
  server.delete("/friends/:id", friend.deleteFriend);
  server.get("/friends/received-invites", invite.getReceivedFriendInvites);
  server.get("/friends/sent-invites", invite.getSentFriendInvites);

  server.post("/rooms", room.createRoom);
  server.put("/rooms/:id/grade", room.gradeRoom);
  server.get("/rooms/own-history", room.getOwnRoomHistory);
  server.get("/rooms/user-history/:userId", room.getUserRoomHistory);
  server.get("/rooms/:id", room.getRoom);
  server.get("/rooms/is-live", room.isLive);
  server.get("/rooms/check-is-valid/:id", room.checkRoom);
}

export async function authApi(server: FastifyInstance): Promise<void> {
  server.post("/auth/sign-up", auth.signUp);
  server.post("/auth/sign-in", auth.signIn);
  server.get("/auth/whoami", auth.whoami);
  server.post("/auth/sign-out", auth.signOut);
}

