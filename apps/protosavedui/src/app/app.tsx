import { SideBarLeft, SideBarRight } from './components/sidebar';
import { NoteList } from './components/notes';
import { ComposerDockSimple } from './components/composer-dock';

import './app.css';
import * as component from './components.css';

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

        <div className={component.stickyBottom}>
          <ComposerDockSimple />
        </div>
      </div>
    </>
  );
}

export default App;
