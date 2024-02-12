import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { userService } from "services/user";

async function handler({ server, session, params }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = await userService.getUserById((params as { id: number }).id);
  
  return rep.status(200).send(getResponse("success", user));
}

export const getUser = defineHandler({
  handler
});