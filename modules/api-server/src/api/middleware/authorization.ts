import { Server } from "platform/types";

export async function authMiddleware({ server, session }: Server.Request, rep: Server.Reply): Promise<void> {
    const user = session.get("user");

    if (!user) {
        rep.status(401);
        throw new Error("No user in session");
    }

    try {
        const userId = (session.get("user") as Record<string, string>).id;

        if (!userId) {
            rep.status(401);
            throw new Error("No user id in session");
        }
    } catch (e) {
        if (e instanceof Error) {
            rep.status(401);
            throw new Error(e.message);
        }
    }
}