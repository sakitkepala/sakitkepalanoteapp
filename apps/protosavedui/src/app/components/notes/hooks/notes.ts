import { useQuery } from '@tanstack/react-query';

import Notes from './notes.mock';

const NOTES_QUERY_KEY = ['notes'];

export type NoteItem = {
  id: number;
  note: string;
  createdAt: string;
};

function getNotes(): Promise<NoteItem[]> {
  return Notes.getAll();
}

function useNotes() {
  return useQuery<NoteItem[]>(NOTES_QUERY_KEY, getNotes);
}

export { NOTES_QUERY_KEY, useNotes };
