import * as React from 'react';

import RenderMarkdown from 'react-markdown';
import { useNotes } from './hooks/notes';

import * as global from '../../app.css';
import * as note from './index.css';

import clsx from 'clsx';

import type { NoteItem } from './hooks/notes';

type NoteGroup = {
  day: string;
  noteItems: NoteItem[];
};

function useListByDate(notes: NoteItem[] | null): NoteGroup[] {
  // TODO: Logic ngelompokin note menurut tanggal

  return React.useMemo<NoteGroup[]>(
    () => [
      {
        day: 'Kemarin',
        noteItems: notes?.slice(3) || [],
      },
      {
        day: 'Hari Ini',
        noteItems: notes?.slice(0, 3) || [],
      },
    ],
    [notes]
  );
}

function NoteList() {
  const { data: notes } = useNotes();
  const listByDate = useListByDate(notes);

  return (
    <div className={note.noteList}>
      {listByDate.map((group, index) => (
        <React.Fragment key={index}>
          <div className={note.separatorBlock}>{group.day}</div>

          {group.noteItems.map((item: NoteItem) => (
            <div key={item.id} className={note.card}>
              <NoteText>{item.note}</NoteText>

              <div className={note.status}>
                {item.id === 5 && (
                  <>
                    <span>
                      <u>diedit</u>
                    </span>{' '}
                  </>
                )}
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

type NoteTextProps = { children?: string };

function NoteText({ children }: NoteTextProps) {
  if (!children) {
    return null;
  }

  return (
    <div className={clsx(note.text, global.flow)}>
      <RenderMarkdown>{children}</RenderMarkdown>
    </div>
  );
}

export { NoteList };
