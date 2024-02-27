import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";

async function handler({ server, session, params }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const invite = await inviteService.getInvite((params as { id: number }).id);
  
  return rep.status(200).send(getResponse("success", invite));
}

export const getInvite = defineHandler({
  handler
});