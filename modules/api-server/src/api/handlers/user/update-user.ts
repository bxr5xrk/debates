import { defineHandler, defineSchema, getResponse } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { userService } from "services/user";

const schema = defineSchema({
  body: type.Object({
    name: type.Optional(type.String()),
    nickname: type.Optional(type.String()),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = await userService.updateUser((params as { id: number }).id, body);

  return rep.status(200).send(getResponse("success", user));
}

export const updateUser = defineHandler({
  schema,
  handler
});