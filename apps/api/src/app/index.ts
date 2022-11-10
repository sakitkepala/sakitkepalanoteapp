import createFastifyServer, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { createYoga } from 'graphql-yoga';

import { schema } from './schema';

function buildServer(logging = true) {
  const server: FastifyInstance = createFastifyServer({
    logger: logging && { level: 'debug' },
  });

  server.register(cors);

  const yoga = createYoga({
    logging: {
      debug: (...args) => args.forEach((arg) => server.log.debug(arg)),
      info: (...args) => args.forEach((arg) => server.log.info(arg)),
      warn: (...args) => args.forEach((arg) => server.log.warn(arg)),
      error: (...args) => args.forEach((arg) => server.log.error(arg)),
    },
    schema,
  });

  server.addContentTypeParser('multipart/form-data', {}, (req, payload, done) =>
    done(null)
  );

  server.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      const response = await yoga.handleNodeRequest(req, { req, reply });
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });
      reply.status(response.status);
      reply.send(response.body);
      return reply;
    },
  });

  return server;
}

export { buildServer };
