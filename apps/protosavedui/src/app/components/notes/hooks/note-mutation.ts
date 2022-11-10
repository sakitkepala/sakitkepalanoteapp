import * as React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { NoteItem } from './notes';
import { NOTES_QUERY_KEY } from './notes';

import Notes from './notes.mock';

function postNote(markdown: string): Promise<NoteItem> {
  if (!markdown) {
    throw new Error('Note gak boleh kosong to, bosque.');
  }
  return Notes.create(markdown);
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
