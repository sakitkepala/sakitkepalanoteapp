import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';

import { NOTES_QUERY_KEY } from '../quick-notes-list/hooks/notes';

const GRAPHQL_API_URL = 'http://localhost:6789/graphql';

const mutationCreateNote = gql`
  mutation createNote($id: ID!, $content: String!) {
    editNote(id: $id, note: $content) {
      id
      note
      createdAt
      modifiedAt
      isEdited
    }
  }
`;

type NoteItem = {
  id: number;
  note: string;
  createdAt: string;
  modifiedAt: string;
  isEdited: boolean;
};

async function sendNote({
  id,
  markdown,
}: {
  id: number;
  markdown: string;
}): Promise<NoteItem> {
  if (!markdown) {
    throw new Error('Note gak boleh kosong to, bosque.');
  }

  const { editNote } = await request<
    {
      editNote: {
        id: string;
        note: string;
        createdAt: string;
        modifiedAt: string;
        isEdited: boolean;
      };
    },
    { id: string; content: string }
  >(GRAPHQL_API_URL, mutationCreateNote, {
    id: id.toString(),
    content: markdown,
  });

  return { ...editNote, id: parseInt(editNote.id) };
}

function useEditNote() {
  const queryClient = useQueryClient();
  const mutation = useMutation(sendNote, {
    onSuccess(data) {
      const oldData = queryClient.getQueryData<NoteItem[]>(NOTES_QUERY_KEY);

      if (!oldData?.length) {
        return;
      }

      const projectedData = [...oldData];
      const oldNoteIndex = oldData.findIndex((note) => note.id === data.id);
      const oldNote = projectedData[oldNoteIndex];
      projectedData[oldNoteIndex] = { ...oldNote, ...data };

      queryClient.setQueryData(NOTES_QUERY_KEY, projectedData);
      queryClient.invalidateQueries(NOTES_QUERY_KEY);
      queryClient.invalidateQueries(['note', data.id]);
    },
  });

  const editNote = React.useCallback(
    async (id: number, markdown: string): Promise<NoteItem> => {
      try {
        const data = await mutation.mutateAsync({ id, markdown });
        return data;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    [mutation]
  );

  return React.useMemo(() => ({ ...mutation, editNote }), [mutation, editNote]);
}

export { useEditNote };
