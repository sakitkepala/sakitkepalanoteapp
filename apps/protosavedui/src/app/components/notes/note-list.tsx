import * as React from 'react';
import { useNotes } from './hooks/notes';

import RenderMarkdown from 'react-markdown';

import * as globalStyle from '../../app.css';
import * as note from './note-list.css';

import clsx from 'clsx';
import { parseISO, format, isYesterday, isToday } from 'date-fns';
import id from 'date-fns/locale/id';

import type { NoteItem } from './hooks/notes';

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
          <div className={note.separatorBlock}>
            <span className={note.bubble}>{group.day}</span>
          </div>

          {group.noteItems.map((item: NoteItem) => (
            <div key={item.id} className={note.card}>
              <MarkdownContent>{item.note}</MarkdownContent>

              <div className={note.status}>
                {item.isEdited && (
                  <React.Fragment>
                    <span>
                      <u>diedit</u>
                    </span>{' '}
                  </React.Fragment>
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

type MarkdownContentProps = { children?: string };

function MarkdownContent({ children }: MarkdownContentProps) {
  // Mungkin akan ada logic untuk customisasi rendering markdown di sini

  if (!children) {
    return null;
  }

  return (
    <div className={clsx(note.text, globalStyle.flow)}>
      <RenderMarkdown>{children}</RenderMarkdown>
    </div>
  );
}

/* =============================== */
// hooks

type NoteGroup = {
  day: string;
  noteItems: NoteItem[];
};

function useListByDate(notes: NoteItem[] | null): NoteGroup[] {
  const noteGroup = React.useMemo<NoteGroup[]>(() => {
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

  return noteGroup;
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
