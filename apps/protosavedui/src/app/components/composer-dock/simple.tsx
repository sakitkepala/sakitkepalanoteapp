import * as React from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

import { gridContainer, gridMiddle } from '../../components.css';
import * as editor from './simple.css';

import { AiOutlinePaperClip } from 'react-icons/ai';
import { IoRocketSharp } from 'react-icons/io5';

import { clsx } from 'clsx';

function ComposerDockSimple() {
  return (
    <div className={clsx(gridContainer)}>
      <div className={clsx(gridMiddle)}>
        <NoteEditor />
      </div>
    </div>
  );
}

function NoteEditor() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const editorRef = React.useRef<EditorView | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const view = new EditorView({
      extensions: [basicSetup, markdown({ codeLanguages: languages })],
      parent: containerRef.current as HTMLElement,
    });

    editorRef.current = view;
    editorRef.current.focus();

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div className={editor.bubble}>
      <div className={editor.bubbleInner}>
        <div style={{ marginLeft: 'auto' }}>
          <button
            title="Tempel lampiran gambar atau file"
            className={editor.button}
          >
            <AiOutlinePaperClip size={24} />
          </button>
        </div>

        <div ref={containerRef} className={editor.editorContainer} />

        <div>
          <button title="Simpan (ctrl + enter)" className={editor.button}>
            <IoRocketSharp size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export { ComposerDockSimple };
