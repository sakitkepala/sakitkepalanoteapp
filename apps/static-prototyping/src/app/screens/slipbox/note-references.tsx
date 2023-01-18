import * as React from 'react';
import * as styles from './note-references.css';

function NoteReferences() {
  return (
    <div className={styles.wrapper}>
      <div>
        <HeadingLabel>Catatan ini mengikuti...</HeadingLabel>
        <div>List note yang mendahului</div>
        <div>List note yang mendahului</div>
      </div>

      <div>
        <HeadingLabel>Diikuti oleh...</HeadingLabel>
        <div>List note yang mengikuti</div>
        <div>List note yang mengikuti</div>
      </div>

      <div>
        <HeadingLabel>Catatan terkait</HeadingLabel>
        <div>List yang di-cross-reference</div>
      </div>
    </div>
  );
}

function HeadingLabel({ children = null }: React.PropsWithChildren) {
  return <h3 className={styles.headingLabel}>{children}</h3>;
}

export { NoteReferences };
