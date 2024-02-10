import "dotenv/config";
import "source-map-support/register";
import { initServer } from "./server";
import { ENV } from "platform/env";
import { logger } from "platform/logger";

(async () => {
    // Init server 
    const server = await initServer();
    logger.info("Server initialized");

    // Start server
    const address = await server.listen({
        port: ENV.SERVER.PORT,
        host: ENV.SERVER.HOST,
    });

    logger.info(`Server successfully started at: ${address}`);
})();
