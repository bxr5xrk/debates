import { defineHandler, defineSchema, getResponse } from "api/lib";
import { OrderDirectionEnum } from "db/enums/order-direction";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const order = (params as { order: OrderDirectionEnum }).order;
  const user = session.get("user") as { id: number };

  const rooms = await roomService.getPublicRooms(user.id, order);
  
  return rep.status(200).send(getResponse("success", rooms));
}

export const getPublicRooms = defineHandler({
  handler
});