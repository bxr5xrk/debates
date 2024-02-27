import { defineHandler, getResponse, defineSchema } from "api/lib";
import { Server } from "platform/types";
import { inviteService } from "services/invite";
import { Type as type } from "@sinclair/typebox";

const schema = defineSchema({
  body: type.Object({
    nickname: type.String(),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };

  const invite = await inviteService.sendInvite(user.id, body.nickname);

  return rep.status(200).send(getResponse("success", invite));
}

export const sendInvite = defineHandler({
  schema,
  handler
});
