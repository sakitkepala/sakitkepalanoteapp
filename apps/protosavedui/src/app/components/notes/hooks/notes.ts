import * as React from 'react';

import { makeMockNotes } from './notes.mock';

export type NoteItem = {
  id: number;
  time: string;
  note: string;
  type: string;
};

export type NoteListData = NoteItem[] | null;

const initialState = () => null || makeMockNotes();

function useNotes(): { data: NoteListData } {
  const [notes] = React.useState<NoteListData>(initialState);
  return { data: notes };
}

export { useNotes };