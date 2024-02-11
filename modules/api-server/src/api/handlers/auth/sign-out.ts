import { defineHandler } from "api/lib";
import { SUCCESS_CODE } from "lib/const";
import { Server } from "platform/types";

async function handler({ session }: Server.Request, rep: Server.Reply): Promise<Server.Reply> {
    session.set("user", null);

    return rep.setCookie(
        "session",
        "sid",
        {
            expires: new Date(),
            maxAge: 0,
        }
    ).status(SUCCESS_CODE).send();
}

export const signOut = defineHandler({
    handler
});