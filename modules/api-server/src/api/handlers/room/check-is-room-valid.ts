import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const id = (params as { id: string }).id;
  const userId = (session.get("user") as { id: number }).id;

  const room = await roomService.checkIsRoomValid(userId, Number(id));
  return rep.status(200).send(getResponse("success", room));
}

export const checkRoom = defineHandler({
  handler
});