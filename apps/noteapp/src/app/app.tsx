import * as React from 'react';

import '@noteapp/global-styles';

const ScreenQuickNotes = React.lazy(
  () => import('@noteapp/screens/quick-notes')
);

export function App() {
  return (
    <>
      <header />
      <React.Suspense fallback={<div>Loading...</div>}>
        <ScreenQuickNotes />
      </React.Suspense>
    </>
  );
}

export default App;
