import fastify from "fastify";

declare module "fastify" {
  interface Session {
    user: unknown;
  }

  interface FastifyInstance {
    io: Socket;
  }
}

export interface UploadImageData {
  data: {
    url: string;
  };
  success: boolean;
}

export type UserWithoutPassword = Omit<User, "password">;