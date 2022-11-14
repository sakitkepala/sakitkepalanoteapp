import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import { join } from 'path';

import type { Resolvers } from './resolvers';
import type { Note as NoteModel } from '@prisma/client';

// TODO: hapus mock
// ? pindah ke "seed" di Prisma?
import { mock } from '@protosavedui/utils';

const GRAPHQL_DIST_PATH = 'schemas';

function createSchema() {
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
        const notes = await context.prisma.note.findMany();
        if (!notes?.length) {
          // TODO: hapus ganti ini:
          // return [];
          return (await mock.Notes.getAll()).map((note) => ({
            ...note,
            id: note.id.toString(),
          }));
        }
        return notes.map((note: NoteModel) => ({
          ...note,
          id: note.id.toString(),
          createdAt: note.createdAt.toISOString(),
        }));
      },
    },
  };

  return makeExecutableSchema({ typeDefs, resolvers });
}

export { createSchema };
