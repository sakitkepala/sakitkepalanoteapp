import { request, gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';

const GRAPHQL_API_URL = 'http://localhost:6789/graphql';

const queryNote = gql`
  query getNote($id: ID!) {
    note(id: $id) {
      id
      note
      createdAt
      modifiedAt
      isEdited
    }
  }
`;

export type NoteItem = {
  id: number;
  note: string;
  createdAt: string;
  modifiedAt: string;
  isEdited: boolean;
};

type ResponseData = {
  note: {
    id: string;
    note: string;
    createdAt: string;
    modifiedAt: string;
    isEdited: boolean;
  };
};

type NoteVariables = { id: string } | undefined;

function useNote(id?: number) {
  const query = useQuery<NoteItem, Error>(
    ['note', id],
    async function getNote(): Promise<NoteItem> {
      try {
        const variables = id ? { id: id.toString() } : undefined;
        const { note } = await request<ResponseData, NoteVariables>(
          GRAPHQL_API_URL,
          queryNote,
          variables
        );

        return {
          ...note,
          id: parseInt(note.id),
        };
      } catch (error) {
        throw new Error(error as string);
      }
    },
    {
      enabled: Boolean(id),
    }
  );

  return query;
}

export { useNote };
