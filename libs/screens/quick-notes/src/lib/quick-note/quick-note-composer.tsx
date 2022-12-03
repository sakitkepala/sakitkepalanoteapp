import * as React from 'react';
import { CodeMirror } from './code-mirror';

import { IoRocketSharp } from 'react-icons/io5';

import * as styles from './quick-note-composer.css';

export type QuickNoteComposerProps = {
  note?: { id: number; content: string };
  onSubmit: ({ id, content }: { id?: number; content: string }) => void;
};

function QuickNoteComposer({ note, onSubmit }: QuickNoteComposerProps) {
  const [content, setContent] = React.useState<string>(note?.content || '');

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
      <button disabled className={styles.button} />
      <div className={styles.editorScrollableArea}>
        <CodeMirror
          defaultContent={note?.content}
          onContentChange={setContent}
        />
      </div>
      <button
        title="Simpan (ctrl + enter)"
        className={styles.button}
        onClick={handleClickSend}
      >
        <IoRocketSharp size={22} />
      </button>
    </div>
  );
}

export { QuickNoteComposer };
