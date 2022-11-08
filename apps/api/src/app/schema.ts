import { FastifyRequest, FastifyReply } from 'fastify';
import { createSchema } from 'graphql-yoga';

export type YogaContext = { req: FastifyRequest; reply: FastifyReply };

export const schema = createSchema<YogaContext>({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world',
    },
  },
});
