import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number; } | null;
  if (!user){
    throw new Error("User is unauthorized");
  }
  const invites = await inviteService.getReceivedInvites(user.id)
  
  return rep.status(200).send(getResponse("success", invites));
}

export const getReceivedInvites = defineHandler({
  handler
});