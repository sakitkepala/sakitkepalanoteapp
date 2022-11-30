import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';

import type { NoteItem } from './notes';
import { NOTES_QUERY_KEY } from './notes';

const GRAPHQL_API_URL = 'http://localhost:6789/graphql';

const mutationCreateNote = gql`
  mutation createNote($content: String!) {
    createNote(note: $content) {
      id
      note
      createdAt
      modifiedAt
      isEdited
    }
  }
`;

async function postNote(markdown: string): Promise<NoteItem> {
  if (!markdown) {
    throw new Error('Note gak boleh kosong to, bosque.');
  }

  const { createNote } = await request<{
    createNote: {
      id: string;
      note: string;
      createdAt: string;
      modifiedAt: string;
      isEdited: boolean;
    };
  }>(GRAPHQL_API_URL, mutationCreateNote, {
    content: markdown,
  });

  return { ...createNote, id: parseInt(createNote.id) };
}

function useCreateNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation(postNote, {
    onSuccess(data) {
      const oldData = queryClient.getQueryData<NoteItem[]>(NOTES_QUERY_KEY);
      const projectedData = oldData ? [...oldData, data] : [data];
      queryClient.setQueryData(NOTES_QUERY_KEY, projectedData);
      queryClient.invalidateQueries(NOTES_QUERY_KEY);
    },
  });

  const create = React.useCallback(
    async (markdown: string): Promise<NoteItem> => {
      try {
        const data = await mutation.mutateAsync(markdown);
        return data;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    [mutation]
  );

  return React.useMemo(() => ({ ...mutation, create }), [mutation, create]);
}

export { useCreateNote };
