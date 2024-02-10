/* eslint-disable @typescript-eslint/indent */
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as fst from "fastify";

export namespace Server {

    export type Instance = fst.FastifyInstance<
        fst.RawServerDefault,
        fst.RawRequestDefaultExpression,
        fst.RawReplyDefaultExpression,
        fst.FastifyBaseLogger,
        TypeBoxTypeProvider
    >;

    export type Request<TSchema extends fst.FastifySchema = fst.FastifySchema> = fst.FastifyRequest<
        fst.RouteGenericInterface,
        fst.RawServerDefault,
        fst.RawRequestDefaultExpression<fst.RawServerDefault>,
        TSchema,
        TypeBoxTypeProvider
    >;

    export type RouteHandler<T extends Request = Request> = Omit<fst.RouteShorthandOptionsWithHandler<
        fst.RawServerDefault,
        fst.RawRequestDefaultExpression,
        fst.RawReplyDefaultExpression,
        fst.RouteGenericInterface,
        fst.ContextConfigDefault,
        fst.FastifySchema,
        TypeBoxTypeProvider
    >, "handler"> & {
        handler: (this: Instance, request: T, reply: Reply) => Promise<unknown>;
    };

    export type HandlerSchema = fst.FastifySchema;

    export type Reply = fst.FastifyReply;
}