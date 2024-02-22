import { EMAIL_REGEX, defineHandler, defineSchema, getResponse } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { authService } from "services/auth";

const schema = defineSchema({
  body: type.Object({
    email: type.String({
      format: "email",
      pattern: EMAIL_REGEX,
    }),
    password: type.String(),
    name: type.String(),
    nickname: type.String(),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const user = await authService.signUp(body);

  session.set("user", {
    id: user?.id,
    email: user?.email,
    nickname: user?.nickname,
  });

  return rep.status(200).send(getResponse("success", user));
}

export const signUp = defineHandler({
  schema,
  handler
});