import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { userService } from "services/user";
import { inviteService } from "services/invite";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number; } | null;

  if (!user){
    throw Error("User is unauthorized");
  }

  const sender = await userService.getUserById(user.id);

  if(!sender){
    throw Error("Sender not found")
  }

  const receiver = await userService.getUserById((params as { userId: number }).userId);

  if(!receiver){
    throw Error("Receiver not found")
  }

  const existingInvite = await inviteService.findInviteByUsers(sender.id, receiver.id)

  if (existingInvite){
    throw Error("Invite is already exist");
  }{
    const invite = await inviteService.createInvite({sender, receiver});
  
    return rep.status(200).send(getResponse("success", invite));
  }
}

export const sendInvite = defineHandler({
  handler
});