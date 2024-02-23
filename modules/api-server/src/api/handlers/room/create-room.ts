import { defineHandler, defineSchema, getResponse } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { roomService } from "services/room";

const schema = defineSchema({
  body: type.Object({
    topic: type.String(),
    judgeId: type.Number(),
    proTeamIds: type.Array(type.Number()),
    conTeamIds: type.Array(type.Number()),
    preparationTime: type.Number(),
    reportTime: type.Number(),
    gradingTime: type.Number(),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  
  const room = await roomService.createRoom(user.id, body.judgeId, body.proTeamIds, body.conTeamIds, {...body});
  
  return rep.status(200).send(getResponse("success", room));
}

export const createRoom = defineHandler({
  schema,
  handler
});