import * as React from 'react';
import { useNotes } from './hooks/notes';

import RenderMarkdown from 'react-markdown';

import * as global from '../../app.css';
import * as note from './index.css';

import clsx from 'clsx';
import { parseISO, format, isYesterday, isToday } from 'date-fns';
import id from 'date-fns/locale/id';

import type { NoteItem } from './hooks/notes';

type NoteGroup = {
  day: string;
  noteItems: NoteItem[];
};

function NoteList() {
  const { data, isLoading, isSuccess } = useNotes();
  const listByDate = useListByDate(data || []);

  React.useLayoutEffect(() => {
    if (!data || !isSuccess) {
      return;
    }
    window.scrollTo(0, document.body.scrollHeight);
  }, [isSuccess, data]);

  if (isLoading) {
    return (
      <div>
        <h3>Memuat...</h3>
      </div>
    );
  }

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
                    {/* Fake edit */}
                    {/* TODO: ganti status asli dari data API */}
                    <span>
                      <u>diedit</u>
                    </span>{' '}
                  </>
                )}
                <span>{item.createdAt}</span>
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

/* =============================== */
// hooks

function useListByDate(notes: NoteItem[] | null): NoteGroup[] {
  return React.useMemo<NoteGroup[]>(() => {
    if (!notes?.length) {
      return [];
    }

    const groups: NoteGroup[] = [];
    const tmpGroup: {
      [date: number]: {
        datetime: Date;
        notes: NoteItem[];
      };
    } = {};

    for (const noteItem of notes) {
      const datetime = parseISO(noteItem.createdAt);
      const date = datetime.getDate();

      tmpGroup[date] = tmpGroup[date] || { datetime, notes: [] };
      tmpGroup[date].notes.push({
        ...noteItem,
        createdAt: format(datetime, 'H:m', { locale: id }),
      });
    }

    for (const dateNumber in tmpGroup) {
      const { datetime, notes } = tmpGroup[dateNumber];
      groups.push({
        day: _formatDayLabel(datetime),
        noteItems: notes,
      });
    }

    return groups;
  }, [notes]);
}

/* =============================== */
// utils

function _formatDayLabel(datetime: Date): string {
  if (isToday(datetime)) {
    return 'Hari Ini';
  }
  if (isYesterday(datetime)) {
    return 'Kemarin';
  }
  return format(datetime, 'd MMM', { locale: id });
}

export { NoteList };
