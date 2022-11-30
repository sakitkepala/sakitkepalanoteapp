import * as React from 'react';
import { QueryProvider } from './query';

function AppProviders({ children }: React.PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
}

export { AppProviders };
