import { SideBarLeft, SideBarRight } from './components/sidebar';
import { NoteList } from './components/notes';
import { NoteComposer } from './components/note-composer';

import './app.css';
import * as component from './components.css';

import { clsx } from 'clsx';

export function App() {
  return (
    <>
      <header></header>

      <div className={component.shell}>
        <div className={component.gridContainer}>
          <SideBarLeft />

          <div>
            <NoteList />
          </div>

          <SideBarRight />
        </div>

        <div className={clsx(component.stickyBottom, component.gridContainer)}>
          <div className={component.gridMiddle}>
            <NoteComposer />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
