import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import ScreenStream from './screens/stream';
import ScreenRepository from './screens/repository';
import ScreenSlipbox from './screens/slipbox';
import ScreenDraft from './screens/draft';

import { AppHeaderBar } from './app-header-bar';

import './global-styles.css';

export function App() {
  return (
    <React.Fragment>
      <AppHeaderBar />
      <Routes>
        <Route path="/stream" element={<ScreenStream />} />
        <Route path="/repository" element={<ScreenRepository />} />
        <Route path="/slipbox" element={<ScreenSlipbox />} />
        <Route path="/draft" element={<ScreenDraft />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
