import { defineHandler, getResponse } from "api/lib";
import { Server } from "platform/types";
import { roomService } from "services/room";

async function handler({ server, session, params, body }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
  const user = session.get("user") as { id: number };
  
  const winsAndLossesChartData = await roomService.getWinsAndLossesChartData(user.id);
  const participationsChartData = await roomService.getParticipationsChartData(user.id);
  
  return rep.status(200).send(getResponse("success", {winsAndLossesChartData, participationsChartData}));
}

export const getOwnCharts = defineHandler({
  handler
});