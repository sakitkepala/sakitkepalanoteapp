import { useNotes } from './components/notes/hooks/notes';

import { SideBarLeft, SideBarRight } from './components/sidebar';
import { NoteList } from './components/notes';
import { ComposerDock } from './components/composer-dock';

import './app.css';
import * as component from './components.css';

export function App() {
  const notes = useNotes();
  return (
    <>
      <header></header>

      <div>
        <div className={component.gridContainer}>
          <SideBarLeft />

          <div>
            <NoteList notes={notes.data} />
          </div>

          <SideBarRight />
        </div>

        <div className={component.stickyBottom}>
          <ComposerDock onSave={notes.create} />
        </div>
      </div>
    </>
  );
}

export default App;
