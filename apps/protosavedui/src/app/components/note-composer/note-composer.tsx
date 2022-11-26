import * as React from 'react';
import { EditorView } from 'codemirror';

import { Editor } from './editor';

import * as composer from './note-composer.css';

import { AiOutlinePaperClip } from 'react-icons/ai';
import { IoRocketSharp } from 'react-icons/io5';

function NoteComposer() {
  const [noteText, setNoteText] = React.useState<string>('');

  const handleClickCreate = () => {
    console.log('simpan note:' + noteText);
  };

  return (
    <div className={composer.container}>
      <button
        disabled
        title="Tempel lampiran gambar atau file"
        className={composer.button}
      >
        <AiOutlinePaperClip size={22} />
      </button>

      <div className={composer.editorScrollableArea}>
        <Editor value={noteText} onChange={setNoteText} />
      </div>

      <button
        title="Simpan (ctrl + enter)"
        className={composer.button}
        onClick={handleClickCreate}
      >
        <IoRocketSharp size={22} />
      </button>
    </div>
  );
}

export { NoteComposer };
