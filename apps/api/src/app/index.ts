import createFastifyServer, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { createYoga } from 'graphql-yoga';
import { createSchema, createContext, AppContext } from '@protosavedui/graphql';

import type { FastifyServerContext } from '@protosavedui/types';

function buildServer(logging = true) {
  const server: FastifyInstance = createFastifyServer({
    logger: logging && { level: 'debug' },
  });

  server.register(cors);

  const yoga = createYoga<FastifyServerContext, AppContext>({
    logging: {
      debug: (...args) => args.forEach((arg) => server.log.debug(arg)),
      info: (...args) => args.forEach((arg) => server.log.info(arg)),
      warn: (...args) => args.forEach((arg) => server.log.warn(arg)),
      error: (...args) => args.forEach((arg) => server.log.error(arg)),
    },
    schema: createSchema,
    context: createContext,
  });

  // Bypass Fastify ketika handle request multipart karena akan di-handle Yoga.
  // Referensi:
  // https://the-guild.dev/graphql/yoga-server/v3/integrations/integration-with-fastify#add-dummy-content-type-parser-for-file-uploads
  server.addContentTypeParser('multipart/form-data', {}, (req, payload, done) =>
    done(null)
  );

  server.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    handler: async (req, reply) => {
      const response: Response = await yoga.handleNodeRequest(req, {
        req,
        reply,
      });
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      /**
       * `graphql-request` di client belum support
       * "content-type": "application/graphql-response+json; charset=utf-8".
       * Bawaan Yoga sama beberapa framework, ngikuti spek baru:
       * https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md#serialization-format
       *
       * Issue di sini:
       * - https://github.com/prisma-labs/graphql-request/issues/388
       * - https://github.com/prisma-labs/graphql-request/issues/373
       *
       * Udah ada perbaikan, nunggu di rilis baru nanti:
       * https://github.com/prisma-labs/graphql-request/commit/1565d490407a57b79447e5d82b1fa34d5a959005
       *
       * Sementara di-overide dulu gini:
       */
      reply.header('content-type', 'application/json');

      reply.status(response.status);
      reply.send(response.body);
      return reply;
    },
  });

  return server;
}

export { buildServer };
