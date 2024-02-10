import { defineHandler } from "api/lib";
import { Server } from "platform/types";
import { SUCCESS_CODE } from "lib/const";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user");

  if (!user) {
      return rep.status(SUCCESS_CODE).send(null);
  }

  return rep.status(SUCCESS_CODE).send(user);
}

export const whoami = defineHandler({
  handler
});