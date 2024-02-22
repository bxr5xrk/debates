import cors from "@fastify/cors";
import "reflect-metadata";
import cookie from "@fastify/cookie";
import session from "@fastify/session";
import { fastify, FastifyInstance } from "fastify";
import { Server } from "platform/types";
import { BadRequest, NotFound } from "lib/exceptions";
import { ENV } from "platform/env";
import { BAD_REQUEST_CODE, MILLISECONDS_IN_SECOND, MINUTES_IN_HOUR, NOT_FOUND_CODE, SECONDS_IN_MINUTE } from "lib/const";
import { initDependencies } from "dependencies";
import { applicationApi, authApi } from "api";
import fastifyMultipart from "@fastify/multipart";

const SESSION_OPTIONS = {
  secret: "secret1234567891011121314151617181920",
  cookieName: "sid",
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR,
  }
};

export async function initServer(): Promise<FastifyInstance> {
  const server = fastify();

  initDependencies();

  server.register(cors, {
    credentials: true,
    origin: ENV.SERVER.CORS_ORIGIN
  });
  server.register(cookie);
  server.register(session, SESSION_OPTIONS);
  server.register(fastifyMultipart, {
    attachFieldsToBody: "keyValues"
  })

  // Register API 
  server.register(applicationApi, { prefix: "/api" });
  server.register(authApi, { prefix: "/api" });

  server.setErrorHandler(errorHandler);

  process.on("SIGTERM", function () {
    server.close();
  });

  return server;
}

function errorHandler(error: Error, req: Server.Request, rep: Server.Reply): Server.Reply {

  if (error instanceof BadRequest) {
    return rep.status(BAD_REQUEST_CODE).send(error.message);
  }

  if (error instanceof NotFound) {
    return rep.status(NOT_FOUND_CODE).send(error.message);
  }

  console.log(error);

  return rep.send(error);
}
