import * as React from 'react';

import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

import * as composer from './note-composer.css';

function Editor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const editorStateRef = React.useRef<EditorState | null>(null);
  const editorViewRef = React.useRef<EditorView | null>(null);

  React.useEffect(() => {
    editorStateRef.current = EditorState.create({
      doc: value,
      extensions: [
        keymap.of(defaultKeymap),
        markdown({ codeLanguages: languages }),

        // Nge-update callback handler onChange di sini,
        // di bagian extension. Hmm...
        // Ini diadaptasi dari demonya Milkdown yang pake ProseMirror malah wkwk:
        // https://github.com/Saul-Mirone/milkdown/blob/main/website/component/Demo/CodeMirror.tsx#L70
        // Q: Apa ini artinya EditorView-nya aja yang di-create tiap useEffect jalan
        // sedangkan EditorState-nya tetap persisten?
        EditorView.updateListener.of((viewUpdate) => {
          if (!viewUpdate.docChanged) {
            return;
          }
          const md: string = viewUpdate.state.doc.toString();
          onChange?.(md);
        }),
      ],
    });
  }, [value, onChange]);

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    editorViewRef.current = new EditorView({ parent: containerRef.current });
    editorViewRef.current.focus();

    return () => {
      editorViewRef.current?.destroy();
    };
  }, []);

  return <div ref={containerRef} className={composer.editorContainer} />;
}

export { Editor };
