import { Server } from "platform/types";

export function defineHandler<T extends Server.Request>(handler: Server.RouteHandler<T>): Server.RouteHandler {
    return handler as Server.RouteHandler;
}

export function defineSchema<T extends Server.HandlerSchema>(schema: T): T {
    return schema;
}

export const EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";

export const QUERY_SEPARATOR = ";";

export function getResponse<T>(status: string, data: T, message?: string): {
    status: string;
    data: T;
    message: string | undefined;
} {
    return {
        status,
        data,
        message,
    };
}