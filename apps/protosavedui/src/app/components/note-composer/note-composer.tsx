import * as React from 'react';
import { useNotes } from '../notes/hooks/notes';
import { useWorkspace } from '../../contexts/workspace';
import { useCreateNote } from '../notes/hooks/note-mutation';
import { useNote } from './hooks/note';
import { useEditNote } from './hooks/edit-note';

import { Editor } from './editor';

import * as composer from './note-composer.css';

import { AiOutlinePaperClip } from 'react-icons/ai';
import { IoRocketSharp } from 'react-icons/io5';

function NoteComposer() {
  const { data: notes } = useNotes();
  const { editNoteId, unsetEdit } = useWorkspace();

  const [noteText, setNoteText] = React.useState<string>('');
  const { isLoading: isLoadingCreate, create: createNote } = useCreateNote();

  const { data: editNoteData } = useNote(editNoteId || undefined);
  const { isLoading: isLoadingEdit, editNote } = useEditNote();

  const isLoading = isLoadingCreate || isLoadingEdit;

  const resetComposer = (): void => {
    unsetEdit();
    setNoteText('');
  };

  const handleClickSend = async () => {
    try {
      if (!editNoteId) {
        await createNote(noteText);
      } else {
        await editNote(editNoteId, noteText);
      }
      resetComposer();
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
          key={editNoteId === editNoteData?.id ? editNoteId : notes?.length}
          disabled={isLoading}
          initialContent={editNoteData?.note}
          onContentChange={setNoteText}
        />
      </div>

      <button
        title="Simpan (ctrl + enter)"
        className={composer.button}
        disabled={!noteText}
        onClick={handleClickSend}
      >
        <IoRocketSharp size={22} />
      </button>
    </div>
  );
}

export { NoteComposer };
