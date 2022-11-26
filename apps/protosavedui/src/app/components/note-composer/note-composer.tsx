import * as React from 'react';
import { useCreateNote } from '../notes/hooks/note-mutation';

import { Editor } from './editor';

import * as composer from './note-composer.css';

import { AiOutlinePaperClip } from 'react-icons/ai';
import { IoRocketSharp } from 'react-icons/io5';

let successCount = 0;

function NoteComposer() {
  const [noteText, setNoteText] = React.useState<string>('');

  const { isLoading, create: createNote } = useCreateNote();

  const handleClickCreate = async () => {
    try {
      await createNote(noteText);
      successCount++;
    } catch (error) {
      console.error(error);
    }
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
        <Editor
          key={successCount}
          disabled={isLoading}
          onContentChange={setNoteText}
        />
      </div>

      <button
        title="Simpan (ctrl + enter)"
        className={composer.button}
        disabled={!noteText}
        onClick={handleClickCreate}
      >
        <IoRocketSharp size={22} />
      </button>
    </div>
  );
}

export { NoteComposer };
