import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const room = await roomService.getRoomById((params as { id: number }).id);
  
  return rep.status(200).send(getResponse("success", room));
}

export const getRoom = defineHandler({
  handler
});