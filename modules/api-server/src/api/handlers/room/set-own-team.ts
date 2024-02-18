import { defineHandler, defineSchema, getResponse } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { roomService } from "services/room";
import { TeamsEnum } from "db/enums/teams";

const schema = defineSchema({
  body: type.Object({
    team: type.Enum(TeamsEnum),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  const roomId = (params as { id: number }).id;
  
  const room = await roomService.setOwnTeam(user.id, roomId, body.team);
  
  return rep.status(200).send(getResponse("success", room));
}

export const setOwnTeam = defineHandler({
  schema,
  handler
});