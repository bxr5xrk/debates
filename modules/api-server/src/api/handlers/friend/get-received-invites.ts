import { defineHandler } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";
import { userService } from "services/user";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = await userService.getUserById((params as { userId: number }).userId);
  if (!user){
    throw Error("User not found");
  }
  const invites = await inviteService.getReceivedInvites(user.id)
  
  return rep.status(200).send(invites);
}

export const getReceivedInvites = defineHandler({
  handler
});