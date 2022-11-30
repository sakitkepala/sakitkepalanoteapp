import * as React from 'react';

export type WorkspaceContext = {
  editNoteId: number | null;
  setEdit: (id: number) => void;
  unsetEdit: () => void;
};

// Ini agak tricky di context. Rujuk ke sini coba:
// - https://github.com/typescript-cheatsheets/react#context
// Aku ikut yang ini buat sementara karena simpel:
// - https://blog.logrocket.com/how-to-use-react-context-typescript/
const Workspace = React.createContext<WorkspaceContext | undefined>(undefined);

function useWorkspace() {
  return React.useContext(Workspace) as WorkspaceContext;
}

function WorkspaceProvider({ children }: React.PropsWithChildren) {
  const [editNoteId, setEditedNote] = React.useState<number | null>(null);

  const value = React.useMemo<WorkspaceContext>(
    () => ({
      editNoteId,
      setEdit: (id: number): void => setEditedNote(id),
      unsetEdit: (): void => setEditedNote(null),
    }),
    [editNoteId]
  );

  return <Workspace.Provider value={value}>{children}</Workspace.Provider>;
}

export { WorkspaceProvider, useWorkspace };
