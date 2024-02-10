import { defineHandler } from "api/lib";
import { Server } from "platform/types";
import { userService } from "services/user";

async function handler({ server, session }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const users = await userService.getUsers();
  
  return rep.status(200).send(users);
}

export const getUsers = defineHandler({
  handler
});