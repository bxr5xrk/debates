import { EMAIL_REGEX, defineHandler, defineSchema } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { userService } from "services/user";

const schema = defineSchema({
  body: type.Object({
    email: type.String({
      format: "email",
      pattern: EMAIL_REGEX,
    }),
    password: type.String(),
    name: type.String(),
    nickName: type.String(),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = await userService.createUser(body);
  
  return rep.status(200).send(user);
}

export const createUser = defineHandler({
  schema,
  handler
});