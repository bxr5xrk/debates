import { FastifyInstance } from "fastify";
import * as user from "./handlers/user";
import * as friend from "./handlers/friend";

export async function applicationApi(server: FastifyInstance): Promise<void> {
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