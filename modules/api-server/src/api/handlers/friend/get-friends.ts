import { defineHandler } from "api/lib";
import { Server } from "platform/types";
import { friendService } from "services/friend";
import { userService } from "services/user";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = await userService.getUserById((params as { userId: number }).userId);
  if (!user){
    throw Error("User not found");
  }
  const friends = await friendService.getFriends(user.id)
  
  return rep.status(200).send(friends);
}

export const getFriends = defineHandler({
  handler
});