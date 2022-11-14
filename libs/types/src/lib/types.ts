import { FastifyRequest, FastifyReply } from 'fastify';

export type FastifyServerContext = {
  req: FastifyRequest;
  reply: FastifyReply;
};
