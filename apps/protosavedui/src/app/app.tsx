import * as Avatar from '@radix-ui/react-avatar';
import clsx from 'clsx';

import * as global from './app.css';
import * as component from './components.css';

export function App() {
  return (
    <>
      <header></header>
      <div className={component.container}>
        <div className={component.sidebar}>
          <div className={component.floatingBrand}>
            <h1 className={component.logoSaved}>SAVED</h1>
          </div>
        </div>

        <div>
          <NoteList />
        </div>

        <div className={component.sidebar}>
          <div className={component.floatingProfile}>
            <div>
              <Avatar.Root className={component.avatar}>
                <Avatar.Image src="" />
                <Avatar.Fallback className={component.fallback}>
                  S
                </Avatar.Fallback>
              </Avatar.Root>
            </div>

            <ul className={clsx(component.sideMenus, global.flow)}>
              <li>
                <a href="#" className={component.menuLink}>
                  @sakitkepala
                </a>
              </li>
              <li>
                <a href="#" className={component.menuLink}>
                  Setingan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function NoteList() {
  return (
    <div className={component.noteList}>
      <div className={component.separatorBlock}>Sudah semuanya</div>
      <div className={component.separatorDate}>30 Oktober</div>

      <div>
        <div className={component.card}>
          <div className={clsx(component.note, global.flow)}>
            <p>Test</p>
          </div>

          <div className={component.status}>
            <span>23:48</span>
          </div>
        </div>
      </div>

      {mockNotes.map((item: NoteType) =>
        item.type === 'date' ? (
          <div key={item.id} className={component.separatorDate}>
            {item.id === 5 ? 'Hari ini' : 'Kemarin'}
          </div>
        ) : (
          <div key={item.id}>
            <div className={component.card}>
              <div className={clsx(component.note, global.flow)}>
                {item.note.map((line, index) => (
                  <p key={index}>{line.text}</p>
                ))}
              </div>

              <div className={component.status}>
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
        <div className={component.card}>
          <div className={clsx(component.note, global.flow)}>
            <p>Catatan pendek aja kalo ini sih.</p>
          </div>

          <div className={component.status}>
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

export default App;

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
