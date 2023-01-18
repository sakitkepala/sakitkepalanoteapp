import { PermanentNote } from './permanent-note';
import { NoteReferences } from './note-references';

import * as styles from './slipbox.css';

function ScreenSlipbox() {
  return (
    <div className={styles.screenContainer}>
      <div>
        <PermanentNote />
        <NoteReferences />
      </div>
    </div>
  );
}

export default ScreenSlipbox;
