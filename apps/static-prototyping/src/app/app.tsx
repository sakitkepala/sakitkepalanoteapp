import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import ScreenCaptures from './screens/captures';
import ScreenRepository from './screens/repository';

import { AppHeaderBar } from './app-header-bar';

import './global-styles.css';

export function App() {
  return (
    <React.Fragment>
      <AppHeaderBar />
      <Routes>
        <Route path="/captures" element={<ScreenCaptures />} />
        <Route path="/repository" element={<ScreenRepository />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
