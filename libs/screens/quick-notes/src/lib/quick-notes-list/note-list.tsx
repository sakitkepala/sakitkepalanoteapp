import * as React from 'react';

import RenderMarkdown from 'react-markdown';
import { useNotes, NoteItem } from './hooks/notes';

import * as globalStyles from '@noteapp/global-styles';
import * as styles from './note-list.css';

import clsx from 'clsx';
import { parseISO, format, isYesterday, isToday } from 'date-fns';
import id from 'date-fns/locale/id';

type NoteListProps = {
  onSelectEditNote?: (id: number) => void;
};

function NoteList({ onSelectEditNote }: NoteListProps) {
  const { data: notes, isLoading, isSuccess } = useNotes();
  const listByDate = useListByDate(notes || []);

  React.useLayoutEffect(() => {
    if (!notes || !isSuccess) {
      return;
    }
    window.scrollTo(0, document.body.scrollHeight);
  }, [isSuccess, notes]);

  if (isLoading) {
    return (
      <div>
        <h3>Memuat...</h3>
      </div>
    );
  }

  return (
    <div className={styles.noteList}>
      {listByDate.map((group, index) => (
        <React.Fragment key={index}>
          <div className={styles.separatorBlock}>
            <span className={styles.bubble}>{group.day}</span>
          </div>

          {group.noteItems.map((item: NoteItem) => (
            <div key={item.id} className={styles.itemWrapper}>
              <Note note={item} />
              <div className={styles.floatingMenuBase}>
                <div className={styles.floatingMenuContainer}>
                  <button
                    className={styles.menuButton}
                    onClick={() => onSelectEditNote?.(item.id)}
                  >
                    edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

type NoteProps = {
  note: NoteItem;
};

function Note({ note }: NoteProps) {
  return (
    <div className={styles.card}>
      <MarkdownContent>{note.note}</MarkdownContent>
      <div className={styles.status}>
        {note.isEdited && (
          <React.Fragment>
            <span>
              <u>diedit</u>
            </span>{' '}
          </React.Fragment>
        )}
        <span>{note.createdAt}</span>
      </div>
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
    <div className={clsx(styles.text, globalStyles.flow)}>
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
      [date: string]: {
        datetime: Date;
        notes: NoteItem[];
      };
    } = {};

    for (const noteItem of notes) {
      const datetime = parseISO(noteItem.createdAt);
      const date = format(datetime, 'yyyy-MM-dd');

      tmpGroup[date] = tmpGroup[date] || {
        datetime,
        notes: [],
      };
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
