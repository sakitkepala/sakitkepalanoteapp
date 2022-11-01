import * as global from '../../app.css';
import * as note from './index.css';
import clsx from 'clsx';

type NoteType = {
  id: number;
  time: string;
  note: NoteText[];
  type: string;
};

type NoteText = {
  type: string;
  text: string;
};

function NoteList() {
  return (
    <div className={note.noteList}>
      <div className={note.separatorBlock}>Sudah semuanya</div>
      <div className={note.separatorBlock}>30 Oktober</div>

      <div>
        <div className={note.card}>
          <div className={clsx(note.text, global.flow)}>
            <p>Test</p>
          </div>

          <div className={note.status}>
            <span>23:48</span>
          </div>
        </div>
      </div>

      {mockNotes.map((item: NoteType) =>
        item.type === 'date' ? (
          <div key={item.id} className={note.separatorBlock}>
            {item.id === 5 ? 'Hari ini' : 'Kemarin'}
          </div>
        ) : (
          <div key={item.id}>
            <div className={note.card}>
              <div className={clsx(note.text, global.flow)}>
                {item.note.map((line, index) => (
                  <p key={index}>{line.text}</p>
                ))}
              </div>

              <div className={note.status}>
                {item.id === 5 && (
                  <>
                    <span>
                      <u>diedit</u>
                    </span>{' '}
                  </>
                )}
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        )
      )}

      <div>
        <div className={note.card}>
          <div className={clsx(note.text, global.flow)}>
            <p>Catatan pendek aja kalo ini sih.</p>
          </div>

          <div className={note.status}>
            <span>
              <u>diedit</u>
            </span>{' '}
            <span>23:19</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NoteList };

const mockNotes: NoteType[] = [...new Array(6)].map(
  (empty: unknown, index: number) => ({
    type: index === 0 || index === 4 ? 'date' : 'content',
    id: index + 1,
    time: '16:' + (index * 3 + 10),
    note: [
      {
        type: 'p',
        text: `When using CSS property values that don’t exist in some browsers, you’ll often declare the property twice and the older browser will ignore the value it doesn’t understand. This isn’t possible using JS objects as you can’t declare the same key twice. So instead, we use an array to define fallback values.`,
      },
      {
        type: 'p',
        text: `Complex Selectors. More complex rules can be written using the selectors key.`,
      },
    ],
  })
);
