import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { likeService } from "services/like";

async function handler({ server, session, params }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  const roomId = (params as { id: number }).id;

  const like = await likeService.unlikeRoom(roomId, user.id);
  
  return rep.status(200).send(getResponse("success", like));
}

export const unlikeRoom = defineHandler({
  handler
});