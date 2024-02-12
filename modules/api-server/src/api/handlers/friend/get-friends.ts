import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { friendService } from "services/friend";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number; } | null;
  if (!user){
    throw Error("User is unauthorized");
  }

  const friends = await friendService.getFriends(user.id)
  
  return rep.status(200).send(getResponse("success", friends));
}

export const getFriends = defineHandler({
  handler
});