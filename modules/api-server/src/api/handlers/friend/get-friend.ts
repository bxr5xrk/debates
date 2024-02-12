import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { friendService } from "services/friend";

async function handler({ server, session, params }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const friend = await friendService.getFriendById((params as { id: number }).id);
  
  return rep.status(200).send(getResponse("success", friend));
}

export const getFriend = defineHandler({
  handler
});