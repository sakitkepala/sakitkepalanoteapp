import { join } from 'path';
import { createSchema } from 'graphql-yoga';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

import type { Resolvers } from '@protosavedui/graphql';
import Notes from './notes.mock';

const GRAPHQL_DIST_PATH = 'schemas';

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
    notes: async () => {
      const notes = await Notes.getAll();
      if (!notes?.length) {
        return [];
      }
      return notes.map((note) => ({
        ...note,
        id: note.id.toString(),
      }));
    },
  },
};

export const schema = createSchema({ typeDefs, resolvers });
