import fastify from "fastify";

declare module "fastify" {
  interface Session {
    user: unknown;
  }
}
