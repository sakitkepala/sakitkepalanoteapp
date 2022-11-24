import { request, gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';

const GRAPHQL_API_URL = 'http://localhost:6789/graphql';

const queryNotes = gql`
  query {
    notes {
      id
      note
      createdAt
      modifiedAt
      isEdited
    }
  }
`;

const NOTES_QUERY_KEY = ['notes'];

export type NoteItem = {
  id: number;
  note: string;
  createdAt: string;
  modifiedAt: string;
  isEdited: boolean;
};

async function getNotes(): Promise<NoteItem[]> {
  const { notes } = await request<{
    notes: {
      id: string;
      note: string;
      createdAt: string;
      modifiedAt: string;
      isEdited: boolean;
    }[];
  }>(GRAPHQL_API_URL, queryNotes);
  return notes.map((note) => ({ ...note, id: parseInt(note.id) }));
}

function useNotes() {
  return useQuery<NoteItem[]>(NOTES_QUERY_KEY, getNotes);
}

export { NOTES_QUERY_KEY, useNotes };
