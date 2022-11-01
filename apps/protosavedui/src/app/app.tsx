import { SideBarLeft, SideBarRight } from './components/sidebar';
import { NoteList } from './components/notes';
import { ComposerBar } from './components/composer-bar';

import './app.css';
import * as component from './components.css';

export function App() {
  return (
    <>
      <header></header>

      <div>
        <div className={component.container}>
          <SideBarLeft />

          <div>
            <NoteList />
          </div>

          <SideBarRight />
        </div>

        <div className={component.bottom}>
          <div />
          <ComposerBar />
          <div />
        </div>
      </div>
    </>
  );
}

export default App;
