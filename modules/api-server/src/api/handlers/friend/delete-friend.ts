import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { friendService } from "services/friend";


async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number; } | null;
  const friendId = (params as { id: number }).id;

  if (!user){
    throw new Error("User is unauthorized");
  }
  await friendService.deleteFriend(friendId, user.id);

  return rep.status(200).send(getResponse("success", [], `Friend deleted successfully.` ));
}

export const deleteFriend = defineHandler({
  handler
});