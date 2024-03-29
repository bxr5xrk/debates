import { defineHandler, defineSchema, getResponse } from "api/lib";
import { OrderDirectionEnum } from "db/enums/order-direction";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params, query }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const order = (query as { order: OrderDirectionEnum }).order;
  const limit = ((query as { limit: number }).limit);
  const page = ((query as { page: number }).page);
  const user = session.get("user") as { id: number };

  const rooms = await roomService.getPublicRooms(user.id, limit, page, order);
  
  return rep.status(200).send(getResponse("success", rooms));
}

export const getPublicRooms = defineHandler({
  handler
});