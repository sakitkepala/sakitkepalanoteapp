import * as React from 'react';
import { TypingCursor } from '../typing-cursor';
import * as component from './index.css';

import { card, text } from '../notes/index.css';

import clsx from 'clsx';

const ComposerBar = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={component.panel}>
        <div className={component.fader}></div>
        <ComposerBarPlaceholder />
        <Composer />
      </div>
    );
  }
);

const ComposerBarPlaceholder = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className={component.composerTrigger}>
        <span>
          &gt; <TypingCursor />
          Tulis catatan...
        </span>
        <span>
          perintah <kbd className={component.kbd}>&#47;</kbd>
        </span>
      </div>
    );
  }
);

function Composer() {
  const [isComposerActive, setComposerActive] = React.useState(false);
  return (
    <div
      className={component.composerOverlay}
      data-composer-active={isComposerActive}
      onClick={isComposerActive ? () => setComposerActive(false) : undefined}
    >
      <div
        className={clsx(card, component.composerTriggerCard)}
        onClick={() => setComposerActive(true)}
      >
        <div className={text}>
          <span className={component.placeholder}>
            <TypingCursor />
            Tulis catatan...
          </span>
        </div>
      </div>
    </div>
  );
}

export { ComposerBar, ComposerBarPlaceholder };
