import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/api/src/schemas/schema.graphql',
  generates: {
    'libs/graphql/src/lib/types/resolvers.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#GraphQLContext',
      },
    },
  },
};

export default config;
