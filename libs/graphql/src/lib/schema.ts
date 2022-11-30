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
import { isAfter } from 'date-fns';

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
          ..._buildNoteMeta(note),
        }));
      },

      note: async (_, args, context) => {
        const foundNote = await context.prisma.note.findUnique({
          where: { id: parseInt(args.id) },
        });

        if (!foundNote) {
          throw new Error('Note gak ditemukan');
        }

        return {
          ...foundNote,
          ..._buildNoteMeta(foundNote),
        };
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
          ..._buildNoteMeta(createdNote),
        };
      },

      editNote: async (_, args, context) => {
        // TODO: handle error

        const updatedNote: NoteModel = await context.prisma.note.update({
          where: { id: parseInt(args.id) },
          data: { note: args.note },
        });

        return {
          ...updatedNote,
          ..._buildNoteMeta(updatedNote),
        };
      },
    },
  };

  return makeExecutableSchema({ typeDefs, resolvers });
}

function _buildNoteMeta(note: NoteModel): {
  id: string;
  createdAt: string;
  modifiedAt: string;
  isEdited: boolean;
} {
  return {
    id: note.id.toString(),
    createdAt: note.createdAt.toISOString(),
    modifiedAt: note.modifiedAt.toISOString(),
    isEdited: isAfter(note.modifiedAt, note.createdAt),
  };
}

export { createSchema };
