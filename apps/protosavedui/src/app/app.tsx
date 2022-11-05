import { SideBarLeft, SideBarRight } from './components/sidebar';
import { NoteList } from './components/notes';
import { ComposerDock } from './components/composer-dock';

import './app.css';
import * as component from './components.css';

export function App() {
  return (
    <>
      <header></header>

      <div>
        <div className={component.gridContainer}>
          <SideBarLeft />

          <div>
            <NoteList />
          </div>

          <SideBarRight />
        </div>

        <div className={component.stickyBottom}>
          <ComposerDock />
        </div>
      </div>
    </>
  );
}

export default App;
