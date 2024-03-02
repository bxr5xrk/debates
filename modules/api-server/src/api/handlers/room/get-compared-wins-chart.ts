import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  const friendNickname = (params as { nickname: string }).nickname;
  
  const userAndFriendWinsChartData = await roomService.getUserAndFriendWinsChartData(user.id, friendNickname);
  
  return rep.status(200).send(getResponse("success", userAndFriendWinsChartData));
}

export const getComparedWinsChart = defineHandler({
  handler
});