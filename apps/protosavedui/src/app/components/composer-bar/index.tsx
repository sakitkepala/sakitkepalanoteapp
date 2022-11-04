import * as React from 'react';

import { motion } from 'framer-motion';
import { TypingCursor } from '../typing-cursor';
import { NoteEditor } from '../editor';

import { gridContainer, gridMiddle, kbd } from '../../components.css';
import { card, text } from '../notes/index.css';
import * as bar from './index.css';

import clsx from 'clsx';

function ComposerBar() {
  const [isComposerOpen, setComposerOpen] = React.useState(false);
  const [shouldInitEditor, setShouldInitEditor] = React.useState(false);
  const [markdown, setMarkdown] = React.useState('');

  const openComposer = () => setComposerOpen(true);
  const closeComposer = () => {
    setComposerOpen(false);
    setShouldInitEditor(false);
  };

  const handleClickDiscard = async (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    closeComposer();
  };

  const [isLoading, setLoading] = React.useState(false);

  const handleClickSubmit = async (ev: React.SyntheticEvent) => {
    ev.stopPropagation();

    // fake submit, temporarily
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
    setLoading(false);

    closeComposer();
  };

  return (
    <>
      <div
        className={clsx(bar.container, gridContainer)}
        data-composer-open={isComposerOpen}
      >
        <motion.div
          className={clsx(gridMiddle, bar.panel)}
          layout
          transition={{
            layout: {
              type: 'spring',
              duration: 0.35,
            },
          }}
        >
          <div className={bar.panelFader} />
          <div className={bar.panelBase}>
            <motion.div
              initial="idle"
              whileHover={!isComposerOpen ? 'peek' : undefined}
              className={bar.composerContainer}
              onClick={openComposer}
            >
              {!isComposerOpen && (
                <div className={bar.commander}>
                  <CommanderPlaceholder />
                </div>
              )}

              <motion.div
                className={bar.composer}
                variants={{
                  idle: { y: '80%', rotateZ: '0.5deg' },
                  peek: { y: '50%' },
                  reveal: {
                    y: 0,
                    rotateZ: 0,
                    transition: {
                      delay: 0.075,
                    },
                  },
                }}
                animate={isComposerOpen ? 'reveal' : undefined}
                onAnimationComplete={
                  isComposerOpen ? () => setShouldInitEditor(true) : undefined
                }
              >
                <div style={{ justifySelf: 'end' }}>
                  {isComposerOpen && <button>attch</button>}
                </div>

                <div className={clsx(card, bar.card)}>
                  <div className={text}>
                    {isComposerOpen && shouldInitEditor ? (
                      <>
                        <NoteEditor onChange={setMarkdown} />
                        <div>
                          <span>Baca:</span>
                          {markdown ? (
                            <pre>{markdown}</pre>
                          ) : (
                            <span>Ketik dulu...</span>
                          )}
                        </div>
                      </>
                    ) : (
                      <ComposerPlaceholder
                        isWaiting={isComposerOpen && !shouldInitEditor}
                        isLoading={isLoading}
                      />
                    )}
                  </div>
                </div>

                <div>
                  {isComposerOpen && (
                    <>
                      <button onClick={handleClickDiscard}>buang</button>
                      <button onClick={handleClickSubmit}>
                        {isLoading ? 'submiting...' : 'save'}
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function CommanderPlaceholder() {
  return (
    <>
      <span>
        &gt; <TypingCursor />
        Tulis catatan...
      </span>
      <span>
        perintah <kbd className={kbd}>&#47;</kbd>
      </span>
    </>
  );
}

function ComposerPlaceholder({
  isLoading,
  isWaiting,
}: {
  isLoading?: boolean;
  isWaiting?: boolean;
}) {
  return (
    <span style={{ opacity: 0.25, fontWeight: 700 }}>
      &gt; <TypingCursor />
      {isLoading
        ? 'Menyimpan...'
        : isWaiting
        ? 'Tunggu sebentar...'
        : 'Tulis catatan...'}
    </span>
  );
}

export { ComposerBar };
