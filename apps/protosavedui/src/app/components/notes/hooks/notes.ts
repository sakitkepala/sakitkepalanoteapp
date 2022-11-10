import { request, gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';

const GRAPHQL_API_URL = 'http://localhost:6789/graphql';

const queryNotes = gql`
  query {
    notes {
      id
      note
      createdAt
    }
  }
`;

const NOTES_QUERY_KEY = ['notes'];

export type NoteItem = {
  id: number;
  note: string;
  createdAt: string;
};

async function getNotes(): Promise<NoteItem[]> {
  const { notes } = await request(GRAPHQL_API_URL, queryNotes);
  return notes;
}

function useNotes() {
  return useQuery<NoteItem[]>(NOTES_QUERY_KEY, getNotes);
}

export { NOTES_QUERY_KEY, useNotes };
