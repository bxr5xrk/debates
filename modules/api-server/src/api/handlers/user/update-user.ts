import { defineHandler, defineSchema } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { userService } from "services/user";

const schema = defineSchema({
  body: type.Object({
    name: type.String(),
    nickName: type.String(),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = await userService.updateUser((params as { id: number }).id, body);

  return rep.status(200).send(user);
}

export const updateUser = defineHandler({
  schema,
  handler
});