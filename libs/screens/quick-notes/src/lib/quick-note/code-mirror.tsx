import * as React from 'react';

import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';

import * as styles from './code-mirror.css';

type CodeMirrorProps = {
  defaultContent?: string;
  disabled?: boolean;
  onContentChange?: (value: string) => void;
};

const onChangeListener = new Compartment();
const disablingOptions = new Compartment();

function CodeMirror({
  disabled = false,
  defaultContent,
  onContentChange,
}: CodeMirrorProps) {
  const cmContainer = React.useRef<HTMLDivElement | null>(null);
  const cmView = React.useRef<EditorView | null>(null);

  // Init Code Mirror dengan konfig default tanpa option dari props
  React.useEffect(() => {
    if (!cmContainer.current) {
      return;
    }

    const extensions = [
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.lineWrapping,
      markdown({ codeLanguages: languages }),
      disablingOptions.of([
        EditorState.readOnly.of(true),
        EditorView.editable.of(false),
      ]),
      onChangeListener.of([]),
    ];

    const state = EditorState.create({
      extensions,
      doc: defaultContent,
    });

    const view = new EditorView({
      parent: cmContainer.current || undefined,
      state: state,
    });

    cmView.current = view;

    return () => {
      cmView.current?.destroy();
    };
  }, [defaultContent]);

  // Update event handler React dari props
  React.useEffect(() => {
    const view = cmView.current;
    if (!view) {
      return;
    }
    view.dispatch({
      effects: onChangeListener.reconfigure(
        EditorView.updateListener.of((viewUpdate) => {
          if (!viewUpdate.docChanged) {
            return;
          }
          const md: string = viewUpdate.state.doc.toString();
          onContentChange?.(md);
        })
      ),
    });
  }, [onContentChange]);

  // Update konfig disable/enable editor
  React.useEffect(() => {
    const view = cmView.current;
    if (!view) {
      return;
    }
    const config = disabled
      ? [EditorState.readOnly.of(true), EditorView.editable.of(false)]
      : [EditorState.readOnly.of(false), EditorView.editable.of(true)];

    view.dispatch({
      effects: disablingOptions.reconfigure(config),
    });
    view.contentDOM.focus();
  }, [disabled]);

  return <div ref={cmContainer} className={styles.cmContainer} />;
}

export { CodeMirror };
