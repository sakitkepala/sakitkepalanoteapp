import * as React from 'react';
import { useNotes } from './hooks/notes';
import { useWorkspace } from '../../contexts/workspace';

import RenderMarkdown from 'react-markdown';

import * as globalStyle from '../../app.css';
import * as noteStyle from './note-list.css';

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
    <div className={noteStyle.noteList}>
      {listByDate.map((group, index) => (
        <React.Fragment key={index}>
          <div className={noteStyle.separatorBlock}>
            <span className={noteStyle.bubble}>{group.day}</span>
          </div>

          {group.noteItems.map((item: NoteItem) => (
            <Note key={item.id} note={item} />
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
  const { editNoteId, setEdit, unsetEdit } = useWorkspace();

  const handleClickEdit = () => {
    if (editNoteId === note.id) {
      unsetEdit();
    } else {
      setEdit(note.id);
    }
  };

  return (
    <div className={noteStyle.itemWrapper}>
      <div className={noteStyle.card}>
        <MarkdownContent>{note.note}</MarkdownContent>

        <div className={noteStyle.status}>
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

      <div className={noteStyle.floatingMenuBase}>
        <div className={noteStyle.floatingMenuContainer}>
          <button className={noteStyle.menuButton} onClick={handleClickEdit}>
            edit
          </button>
        </div>
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
    <div className={clsx(noteStyle.text, globalStyle.flow)}>
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
