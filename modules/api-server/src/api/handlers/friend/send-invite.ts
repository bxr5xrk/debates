import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number; } | null;

  if (!user){
    throw Error("User is unauthorized");
  }

  const invite = await inviteService.sendInvite(user.id, (params as { userId: number }).userId)
  
  return rep.status(200).send(getResponse("success", invite));
}

export const sendInvite = defineHandler({
  handler
});