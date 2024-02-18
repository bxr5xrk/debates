import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const userId = (params as { userId: number }).userId;
  
  const room = await roomService.getUserEndedRooms(userId);
  
  return rep.status(200).send(getResponse("success", room));
}

export const getUserRoomHistory = defineHandler({
  handler
});