import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { AppProviders } from './app/providers';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
