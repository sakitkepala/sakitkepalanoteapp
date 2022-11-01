import * as React from 'react';

import { motion } from 'framer-motion';
import { TypingCursor } from '../typing-cursor';

import { gridContainer, gridMiddle } from '../../components.css';
import { card, text } from '../notes/index.css';
import * as bar from './index.css';

import clsx from 'clsx';

function ComposerBar() {
  const [isComposerActive, setComposerActive] = React.useState(false);

  return (
    <>
      <div className={gridContainer} data-composer-active={isComposerActive}>
        <motion.div
          className={clsx(gridMiddle, bar.panel)}
          layout
          transition={{
            layout: { duration: 0.15 },
          }}
        >
          <div className={bar.fader} />
          <div className={bar.commanderContainer}>
            {!isComposerActive && (
              <div className={bar.commander}>
                <span>
                  &gt; <TypingCursor />
                  Tulis catatan...
                </span>
                <span>
                  perintah <kbd className={bar.kbd}>&#47;</kbd>
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <div
          className={clsx(gridContainer, bar.composerContainer)}
          data-composer-active={isComposerActive}
        >
          <div className={clsx(gridMiddle, bar.composer)}>
            <div
              className={clsx(card, bar.card)}
              onClick={() => setComposerActive((active) => !active)}
            >
              <div className={text}>
                <span className={bar.placeholder}>
                  <TypingCursor />
                  Tulis catatan...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { ComposerBar };
