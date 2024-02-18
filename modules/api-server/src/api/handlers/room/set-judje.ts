import { defineHandler, getResponse } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  const roomId = (params as { id: number }).id;
  const userId = (params as { userId: number }).userId;
  
  const room = await roomService.setJudje(user.id, userId, roomId);
  
  return rep.status(200).send(getResponse("success", room));
}

export const setJudje = defineHandler({
  handler
});