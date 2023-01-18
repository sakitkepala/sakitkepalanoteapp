import { Routes, Route } from 'react-router-dom';

import ScreenStream from './screens/stream';
import ScreenRepository from './screens/repository';
import ScreenSlipbox from './screens/slipbox';
import ScreenDraft from './screens/draft';

import './global-styles.css';

export function App() {
  return (
    <Routes>
      <Route path="/stream" element={<ScreenStream />} />
      <Route path="/repository" element={<ScreenRepository />} />
      <Route path="/slipbox" element={<ScreenSlipbox />} />
      <Route path="/draft" element={<ScreenDraft />} />
    </Routes>
  );
}

export default App;
