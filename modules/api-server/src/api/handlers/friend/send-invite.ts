import { defineHandler, defineSchema } from "api/lib";
import { Type as type } from "@sinclair/typebox";
import { Server } from "platform/types";
import { userService } from "services/user";
import { inviteService } from "services/invite";
import { InviteStatusEnum } from "db/enums/invite-status.enum";

const schema = defineSchema({
  body: type.Object({
    senderId: type.Number(),
    receiverId: type.Number(),
  })
});

async function handler({ server, session, params, body }: Server.Request<typeof schema>, rep: Server.Reply): Promise<Server.Reply> {
  const sender = await userService.getUserById(body.senderId);

  if(!sender){
    throw Error("Sender not found")
  }

  const receiver = await userService.getUserById(body.receiverId);

  if(!receiver){
    throw Error("Receiver not found")
  }

  const existingInvite = await inviteService.findInviteByUsers(sender.id, receiver.id)

  if (existingInvite){
    throw Error("Invite is already exist");
  }{
    const invite = await inviteService.createInvite({sender, receiver});
  
    return rep.status(200).send(invite);
  }
}

export const sendInvite = defineHandler({
  schema,
  handler
});