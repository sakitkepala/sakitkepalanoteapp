import * as React from 'react';

import { format } from 'date-fns';
import id from 'date-fns/locale/id';

import { makeMockNotes } from './notes.mock';

export type NoteItem = {
  id: number;
  note: string;
  createdAt: string;
};

export type NotesData = NoteItem[];

const initialState = () => makeMockNotes();

function useNotes(): {
  data: NotesData;
  // TODO: pindah function create-nya jadi function mutation nanti
  create: (markdown: string) => void;
} {
  const [notes, setNotes] = React.useState<NotesData>(initialState);

  const create = React.useCallback((markdown: string) => {
    if (!markdown) {
      throw new Error('Teks markdown harus diisi!');
    }

    setNotes((notes) => {
      const newNote: NoteItem = {
        id: notes.length + 1,
        note: markdown,
        createdAt: _formatServerDatetime(new Date()),
      };
      return [...notes, newNote];
    });
  }, []);

  return { data: notes, create };
}

function _formatServerDatetime(date: Date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss', { locale: id });
}

export { useNotes };
