import * as React from 'react';

import { EditorState, EditorSelection, ChangeSpec } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

import * as composer from './note-composer.css';

type EditorProps = {
  initialContent?: string;
  disabled?: boolean;
  onContentChange?: (value: string) => void;
};

function Editor({
  disabled = false,
  initialContent,
  onContentChange,
}: EditorProps) {
  const cmContainer = React.useRef<HTMLDivElement | null>(null);
  const cmView = React.useRef<EditorView | null>(null);

  const initialContentImmutable = React.useRef(initialContent);
  const [internalContent, setInternalContent] = React.useState<
    string | undefined
  >(initialContent);

  React.useEffect(() => {
    if (!cmContainer.current) {
      return;
    }

    const extensions = [
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.lineWrapping,
      markdown({ codeLanguages: languages }),

      // Nge-update callback handler onChange di sini,
      // di bagian extension. Hmm...
      // Ini diadaptasi dari demonya Milkdown yang pake ProseMirror malah wkwk:
      // https://github.com/Saul-Mirone/milkdown/blob/main/website/component/Demo/CodeMirror.tsx#L70
      // Q: Apa ini artinya EditorView-nya aja yang di-create tiap useEffect jalan
      // sedangkan EditorState-nya tetap persisten?
      // Bisa juga pakai `dispatch` di view, kayak di Sandpack, tapi hasilnya juga sama:
      // https://github.com/codesandbox/sandpack/blob/main/sandpack-react/src/components/CodeEditor/CodeMirror.tsx#L307
      EditorView.updateListener.of((viewUpdate) => {
        if (!viewUpdate.docChanged) {
          return;
        }
        const md: string = viewUpdate.state.doc.toString();
        setInternalContent(md);
        onContentChange?.(md);
      }),
    ];

    if (disabled) {
      extensions.push(EditorState.readOnly.of(true));
      extensions.push(EditorView.editable.of(false));
    } else {
      extensions.push(EditorState.readOnly.of(false));
      extensions.push(EditorView.editable.of(true));
    }

    const state = EditorState.create({
      doc: initialContentImmutable.current,
      extensions: extensions,
    });

    const view = new EditorView({
      parent: cmContainer.current,
      state,
    });

    cmView.current = view;

    return () => {
      cmView.current?.destroy();
    };
  }, [disabled, initialContent, onContentChange]);

  React.useEffect(() => {
    !disabled && cmView.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Kalau state diinit pakai `initialContent`, entah kenapa editornya
  // langsung lost focus. Gak bisa lanjut ngetik. Jadi kursor & selection
  // harus diupdate manual di posisi akhir teks.
  React.useEffect(() => {
    const view = cmView.current;
    if (!view || internalContent === initialContentImmutable.current) {
      return;
    }

    const selection = internalContent
      ? EditorSelection.cursor(internalContent.length)
      : view.state.selection;

    const changes: ChangeSpec = {
      from: 0,
      to: view.state.doc.length,
      insert: internalContent,
    };

    view.dispatch({ changes, selection });
  }, [disabled, internalContent]);

  return <div ref={cmContainer} className={composer.cmContainer} />;
}

export { Editor };
