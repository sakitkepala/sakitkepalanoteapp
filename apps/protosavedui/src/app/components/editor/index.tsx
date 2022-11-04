import * as React from 'react';
import { basicSetup, EditorView } from 'codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

import { motion } from 'framer-motion';

type NoteEditorProps = {
  onChange?: (value: string) => void;
};

function NoteEditor({ onChange }: NoteEditorProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const editorRef = React.useRef<EditorView | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const view = new EditorView({
      doc:
        '# TODO: styling theme editor\n\n' +
        'supaya nge-blend sama theme si app\n\n' +
        '# TODO: mock save pakai state\n\n' +
        'supaya bisa interaksi CRUD beneran',
      extensions: [
        basicSetup,
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
      parent: containerRef.current as HTMLElement,
    });

    editorRef.current = view;
    editorRef.current.focus();

    return () => {
      view.destroy();
    };
  }, [onChange]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    />
  );
}

export { NoteEditor };
