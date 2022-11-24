import {
  makeExecutableSchema,
  GraphQLSchemaWithContext,
} from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import type { Note as NoteModel } from '@prisma/client';
import type { Resolvers } from './types/resolvers';
import type { GraphQLContext } from './context';

import { join } from 'path';

const GRAPHQL_DIST_PATH = 'schemas';

function createSchema(): GraphQLSchemaWithContext<GraphQLContext> {
  // `loadSchemaSync` itu kayak `readFileSync` dari `fs`.
  // Kata kuncinya itu "read file", yang terjadinya waktu *runtime*.
  // Ketika sudah dibuild, dia cari direktori relatif terhadap file
  // hasil buildnya. Seperti direktori `assets`.
  // Ada diskusi yang relevan di sini:
  // https://github.com/dotansimha/graphql-yoga/discussions/1101
  // Di sini juga:
  // https://www.howtographql.com/graphql-js/3-a-simple-mutation/
  const typeDefs = loadSchemaSync(
    join(__dirname, GRAPHQL_DIST_PATH, 'schema.graphql'),
    { loaders: [new GraphQLFileLoader()] }
  );

  const resolvers: Resolvers = {
    Query: {
      notes: async (_, __, context) => {
        // TODO: handle error

        const notes: NoteModel[] = await context.prisma.note.findMany();
        if (!notes?.length) {
          return [];
        }
        return notes.map((note) => ({
          ...note,
          id: note.id.toString(),
          createdAt: note.createdAt.toISOString(),
        }));
      },
    },

    Mutation: {
      createNote: async (_, args, context) => {
        // TODO: handle error

        const createdNote = await context.prisma.note.create({
          data: {
            note: args.note,
          },
        });

        return {
          ...createdNote,
          id: createdNote.id.toString(),
          createdAt: createdNote.createdAt.toISOString(),
        };
      },
    },
  };

  return makeExecutableSchema({ typeDefs, resolvers });
}

export { createSchema };
