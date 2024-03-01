import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  const roomId = (params as { id: number }).id;

  const room = await roomService.publishRoom(roomId, user.id);
  
  return rep.status(200).send(getResponse("success", room));
}

export const publishRoom = defineHandler({
  handler
});