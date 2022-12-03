import * as React from 'react';
import { QuickNoteComposer, QuickNoteComposerProps } from './quick-note';
import { NoteList as QuickNotesList } from './quick-notes-list';

import { useNote } from './hooks/note';
import { useCreateNote } from './quick-notes-list/hooks/note-mutation';
import { useEditNote } from './hooks/edit-note';

import * as styles from './quick-notes-screen.css';

import { clsx } from 'clsx';

const makeTimestamp = () => new Date().getTime();

export function ScreenQuickNotes() {
  const [sessionTimestamp, setSessionTimestamp] =
    React.useState<number>(makeTimestamp);
  const [editNoteId, setEditNoteId] = React.useState<number | null>(null);

  const { data } = useNote(editNoteId || undefined);
  const { create } = useCreateNote();
  const { editNote } = useEditNote();

  const noteForEdit = data ? { id: data.id, content: data.note } : undefined;

  const resetSession = () => {
    setEditNoteId(null);
    setSessionTimestamp(makeTimestamp());
  };

  const handleSubmitNote: QuickNoteComposerProps['onSubmit'] = async (
    value
  ) => {
    try {
      value?.id
        ? await editNote(value.id, value.content)
        : await create(value.content);
      resetSession();
    } catch (error) {
      console.error(error);
    }
  };

  const getComposerSessionKey = (editNoteId?: number | string | null) => {
    return 'note-' + (editNoteId || sessionTimestamp);
  };

  return (
    <div className={styles.shell}>
      <div className={styles.gridContainer}>
        <div className={styles.gridMiddle}>
          <QuickNotesList onSelectEditNote={setEditNoteId} />
        </div>
      </div>
      <div className={clsx(styles.stickyBottom, styles.gridContainer)}>
        <div className={styles.gridMiddle}>
          <QuickNoteComposer
            key={getComposerSessionKey(noteForEdit?.id)}
            note={noteForEdit}
            onCloseEdit={() => setEditNoteId(null)}
            onSubmit={handleSubmitNote}
          />
        </div>
      </div>
    </div>
  );
}

export default ScreenQuickNotes;
