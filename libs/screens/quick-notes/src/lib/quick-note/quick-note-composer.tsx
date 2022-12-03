import * as React from 'react';

import { CodeMirror } from './code-mirror';
import { IoRocketSharp, IoCloseSharp } from 'react-icons/io5';

import * as styles from './quick-note-composer.css';

type InternalNoteStructure = { id: number; content: string };

export type QuickNoteComposerProps = {
  note?: InternalNoteStructure;
  onCloseEdit?: (id: number) => void;
  onSubmit: ({ id, content }: { id?: number; content: string }) => void;
};

function QuickNoteComposer({
  note,
  onCloseEdit,
  onSubmit,
}: QuickNoteComposerProps) {
  const [content, setContent] = React.useState<string>(note?.content || '');
  const submitIsDisabled = !content;

  const handleClickSend = () => {
    if (!content) {
      // TODO: feedback konten kosong
      alert('kosong. isi dulu');
      return;
    }
    onSubmit({
      id: note?.id,
      content: content,
    });
  };

  return (
    <div className={styles.container}>
      {!note?.content ? null : (
        <div className={styles.editRow}>
          <button disabled className={styles.button} />
          <div className={styles.editDisplay}>
            <div className={styles.editLabel}>
              <span>Mengedit</span>
            </div>
            <div className={styles.editSnippet}>{note.content}</div>
          </div>
          <button
            title="Batalkan"
            className={styles.button}
            onClick={() => onCloseEdit?.(note.id)}
          >
            <IoCloseSharp size={22} />
          </button>
        </div>
      )}

      <div className={styles.editorRow}>
        <button disabled className={styles.button} />
        <div className={styles.editorScrollableArea}>
          <CodeMirror
            defaultContent={note?.content}
            onContentChange={setContent}
          />
        </div>
        <button
          title={submitIsDisabled ? 'Tulis catatan' : 'Simpan (ctrl + enter)'}
          className={styles.button}
          disabled={submitIsDisabled}
          onClick={handleClickSend}
        >
          <IoRocketSharp size={22} />
        </button>
      </div>
    </div>
  );
}

export { QuickNoteComposer };
