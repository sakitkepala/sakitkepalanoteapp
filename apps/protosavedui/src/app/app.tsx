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
          <ul className={clsx(component.sideMenus, global.flow)}>
            <li>
              <a href="#" className={component.menuLink}>
                Item Menu
              </a>
            </li>
            <li>
              <a href="#" className={component.menuLink}>
                Item Menu
              </a>
            </li>
            <li>
              <a href="#" className={component.menuLink}>
                Item Menu
              </a>
            </li>
            <li>
              <a href="#" className={component.menuLink}>
                Item Menu
              </a>
            </li>
          </ul>
        </div>

        <div>
          <NoteList />
        </div>

        <div className={component.sidebar}>
          <div>
            <Avatar.Root className={component.avatar}>
              <Avatar.Image src="" />
              <Avatar.Fallback />
            </Avatar.Root>
          </div>
          <ul className={clsx(component.sideMenus, global.flow)}>
            <li>
              <a href="#" className={component.menuLink}>
                Item Menu
              </a>
            </li>
            <li>
              <a href="#" className={component.menuLink}>
                Item Menu
              </a>
            </li>
            <li>
              <a href="#" className={component.menuLink}>
                Item Menu
              </a>
            </li>
            <li>
              <a href="#" className={component.menuLink}>
                Item Menu
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function NoteList() {
  return (
    <div className={component.noteList}>
      <div className={component.startBlock}>Start</div>
      {mockNotes.map((item: NoteType) => (
        <div key={item.id} className={component.card}>
          <div className={global.flow}>
            <p>{item.note}</p>
            <p>{item.note}</p>
          </div>
        </div>
      ))}
      <div className={component.startBlock}>End</div>
    </div>
  );
}

export default App;

type NoteType = {
  id: number;
  note: string;
};

const mockNotes: NoteType[] = [...new Array(8)].map(
  (empty: unknown, index: number) => ({
    id: index + 1,
    note: `Complex Selectors

  More complex rules can be written using the selectors key.

  To improve maintainability, each style block can only target a single element. To enforce this, all selectors must target the & character which is a reference to the current element.`,
  })
);
