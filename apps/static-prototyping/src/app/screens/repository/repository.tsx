import * as React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { BsCardText } from 'react-icons/bs';
import { MdUnfoldMore } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCloseSharp, IoAddSharp } from 'react-icons/io5';
import { RxCardStackPlus } from 'react-icons/rx';
import {
  HiOutlineInboxStack,
  HiOutlineRectangleStack,
  HiOutlineQueueList,
} from 'react-icons/hi2';
import { clsx } from 'clsx';
import * as styles from './repository.css';
import * as globalStyles from '../../global-styles.css';

type Panel = {
  id: number;
  visible: boolean;
  threadName?: string;
  component?: JSX.Element;
};

const fakePanelsData: Panel[] = [
  {
    id: 1,
    visible: true,
  },
  {
    id: 2,
    visible: true,
    threadName: 'Utas Tersimpan, Uhuy!',
    component: <ThreadPanelWithFakeContent />,
  },
  {
    id: 3,
    visible: true,
    threadName: 'Utas Panjang Nyampe Nyekrol',
    component: <ThreadPanelWithFakeLongContent />,
  },
  {
    id: 4,
    visible: true,
    component: <ThreadPanelWithFakeSingleContent />,
  },
];

function ScreenRepository() {
  const [panels, setPanels] = React.useState<Panel[]>([]);
  const visiblePanels = panels.filter((p) => p.visible);

  const onOpenThreadPanel = (id: number) => {
    setPanels((panels) => {
      if (panels.length === 0) {
        return fakePanelsData.map((p) => ({ ...p, visible: p.id === id }));
      }
      return panels.map((p) => (p.id !== id ? p : { ...p, visible: true }));
    });
  };

  return (
    <div className={styles.screenRepositoryContainer}>
      <div style={{ width: '20rem' }}>
        <TabbedRepoPanel
          setPanels={setPanels}
          onOpenThreadPanel={onOpenThreadPanel}
        />
        {false && (
          <StackingNotesThreadsPanel
            setPanels={setPanels}
            onOpenThreadPanel={onOpenThreadPanel}
          />
        )}
      </div>
      <ThreadWorkspace setPanels={setPanels} visiblePanels={visiblePanels} />
      <div style={{ width: '20rem', color: globalStyles.primaryBlue }}>
        side bar
      </div>
    </div>
  );
}

function TabbedRepoPanel({
  setPanels,
  onOpenThreadPanel,
}: {
  setPanels: React.Dispatch<React.SetStateAction<Panel[]>>;
  onOpenThreadPanel: (id: number) => void;
}) {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  return (
    <div className={styles.repoPanel}>
      <div className={styles.repoTabBar}>
        <RepoTabButton
          title="Catatan"
          isActive={activeTab === 0}
          onClick={() => setActiveTab(0)}
        >
          <HiOutlineRectangleStack size="18" />
        </RepoTabButton>
        <RepoTabButton
          title="Utas"
          isActive={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >
          <HiOutlineQueueList size="18" />
        </RepoTabButton>
      </div>
      {activeTab === 0 && (
        <RepoContentPanel>
          <RepoNoteList>
            {[
              { name: 'f1' },
              { name: 'f1a' },
              { name: 'f2' },
              {
                name: 'f1b',
                preview: 'Pura-puranya ini note dengan nomer ID f1b. ...',
              },
              {
                name: 'f1c',
                preview: 'Note ID f1c, lanjutan dari ID f1b. ...',
              },
              { name: '...truncated' },
              { name: 'fokajs98' },
              { name: 'fokajs99' },
            ].map((note) => (
              <RepoNoteCardItem
                key={note.name}
                onClick={() => {
                  const run: { [name: string]: () => void } = {
                    f1b: () => {
                      setPanels((panels) => {
                        if (panels.length === 0) {
                          return fakePanelsData.map((p) => ({
                            ...p,
                            visible: p.id === 4,
                          }));
                        } else {
                          return panels.map((p) => ({
                            ...p,
                            visible: p.id === 4 || p.visible,
                          }));
                        }
                      });
                    },

                    f1c: () => {
                      setPanels((panels) => {
                        if (
                          panels.length === 0 ||
                          !panels.find((p) => p.id === 4)
                        ) {
                          return panels;
                        } else {
                          return panels.map((p) =>
                            p.id !== 4
                              ? p
                              : {
                                  ...p,
                                  component: (
                                    <ThreadPanelWithFakeOrderedContent />
                                  ),
                                }
                          );
                        }
                      });
                    },
                  };

                  run[note.name]?.();
                }}
              >
                {note.preview || note.name}
              </RepoNoteCardItem>
            ))}
          </RepoNoteList>
        </RepoContentPanel>
      )}
      {activeTab === 1 && (
        <RepoContentPanel>
          <RepoNoteList>
            {[fakePanelsData[1], fakePanelsData[2]].map((p, i) => (
              <RepoThreadItem
                key={p.id}
                onClick={() => onOpenThreadPanel(p.id)}
                title={p.threadName}
              >
                {p.threadName}
              </RepoThreadItem>
            ))}
          </RepoNoteList>
        </RepoContentPanel>
      )}
    </div>
  );
}

function RepoNoteList({ children }: React.PropsWithChildren) {
  return <div className={styles.repoNoteList}>{children}</div>;
}

function RepoNoteCardItem({
  children,
  onClick,
}: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div className={styles.repoNoteCardItem} onClick={onClick}>
      <span className={styles.repoNoteCardIcon}>
        <BsCardText size="24" />
      </span>
      <span>{children}</span>
    </div>
  );
}

function RepoThreadItem({
  children,
  title,
  onClick,
}: React.PropsWithChildren<{ title?: string; onClick?: () => void }>) {
  return (
    <div className={styles.repoNoteCardItem} onClick={onClick} title={title}>
      <span className={styles.repoNoteCardIcon}>
        <HiOutlineQueueList size="24" />
      </span>
      <span>{children}</span>
    </div>
  );
}

function RepoTabButton({
  title,
  isActive,
  onClick,
  children,
}: React.PropsWithChildren<{
  onClick: () => void;
  isActive?: boolean;
  title?: string;
}>) {
  return !children ? null : (
    <div className={clsx(styles.tab, isActive ? styles.tabActive : undefined)}>
      <button
        className={clsx(
          styles.tabButtonBase,
          styles.repoTabButton,
          isActive ? styles.repoTabButtonActive : undefined
        )}
        title={title}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

function RepoContentPanel({ children }: React.PropsWithChildren) {
  return (
    <ScrollArea.Root className={styles.repoContentPanel}>
      <ScrollArea.Viewport className={styles.repoContentPanelViewport}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

function Par({ children }: React.PropsWithChildren) {
  if (!children) return null;
  return <p className={styles.par}>{children}</p>;
}

function ThreadWelcomeScreen({
  setPanels,
  onOpenNewPanel,
}: {
  onOpenNewPanel: (id?: number) => void;
  setPanels: React.Dispatch<React.SetStateAction<Panel[]>>;
}) {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeMainIcon}>
          <HiOutlineInboxStack size="72" />
        </div>

        <ul className={clsx(styles.quickActionList, styles.shortcutsButtons)}>
          <li>
            <QuickActionButton
              icon={<RxCardStackPlus size="18" />}
              onClick={() => alert('TODO: Modal tulis Catatan baru')}
              title="Fitur segera rilis"
            >
              Tulis Catatan
            </QuickActionButton>
          </li>
        </ul>

        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            onOpenNewPanel();
          }}
        >
          <input
            type="text"
            className={styles.noteSearchBox}
            placeholder="Temukan dalam repositori..."
          />
        </form>

        <div className={styles.welcomeActionsGrid}>
          <div>
            <LatestNotes setPanels={setPanels} />
          </div>

          <div>
            <h2 className={styles.quickActionSectionLabel}>Utas Barusan</h2>
            <ul className={styles.quickActionList}>
              {[fakePanelsData[1], fakePanelsData[2]].map((p) => (
                <li key={p.id}>
                  <QuickActionButton
                    icon={<HiOutlineQueueList size="18" />}
                    onClick={() => onOpenNewPanel(p.id)}
                    title={p.threadName}
                  >
                    {p.threadName}
                  </QuickActionButton>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '0.75rem' }}>
              <QuickActionButton
                onClick={() => alert('TODO: Buka sidebar list threads')}
              >
                Telusuri Semua Utas
              </QuickActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LatestNotes({
  setPanels,
}: {
  setPanels: React.Dispatch<React.SetStateAction<Panel[]>>;
}) {
  return (
    <React.Fragment>
      <h2 className={styles.quickActionSectionLabel}>Catatan Terbaru</h2>
      <div className={styles.quickActionPreviewNoteCardList}>
        {[
          { name: 'fokajs99' },
          { name: 'fokajs98' },
          {
            name: 'f1b',
            preview: 'Note nomer ID f1b. ...',
          },
        ].map((n) => (
          <button
            key={n.name}
            className={clsx(
              styles.quickActionBaseCardButton,
              styles.quickActionPreviewNoteCard
            )}
            onClick={
              n.name !== 'f1b'
                ? undefined
                : () => {
                    setPanels((panels) => {
                      if (panels.length === 0) {
                        return fakePanelsData.map((p) => ({
                          ...p,
                          visible: p.id === 4,
                        }));
                      } else {
                        return panels.map((p) => ({
                          ...p,
                          visible: p.id === 4 || p.visible,
                        }));
                      }
                    });
                  }
            }
          >
            <span>
              <BsCardText size="18" /> {n.name}
            </span>
            <span className={styles.latestNotePreviewText}>
              {n.preview || (
                <React.Fragment>Ini teks fake aja wkwk...</React.Fragment>
              )}
            </span>
          </button>
        ))}

        <div style={{ marginTop: '0.75rem' }}>
          <QuickActionButton
            onClick={() => alert('TODO: Buka sidebar list notes')}
          >
            Telusuri Semua Catatan
          </QuickActionButton>
        </div>
      </div>
    </React.Fragment>
  );
}

function QuickActionButton({
  className,
  children,
  icon,
  full = false,
  truncLabel = false,
  ...props
}: {
  icon?: JSX.Element;
  full?: boolean;
  truncLabel?: boolean;
} & React.ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      {...props}
      className={clsx(
        styles.quickActionButton,
        full ? styles.quickActionButtonFull : undefined
      )}
    >
      {typeof icon !== 'undefined' && (
        <>
          <span>{icon}</span>{' '}
        </>
      )}
      <span
        className={clsx(
          styles.quickActionButtonLabel,
          full && truncLabel ? styles.quickActionButtonLabelTrunc : undefined
        )}
      >
        {children}
      </span>
    </button>
  );
}

function ThreadWorkspace({
  setPanels,
  visiblePanels,
}: {
  setPanels: React.Dispatch<React.SetStateAction<Panel[]>>;
  visiblePanels: Panel[];
}) {
  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(1);
  const hasPanels = visiblePanels.length > 0;
  const hasComponent =
    visiblePanels[activeTabIndex]?.id !== 1 &&
    visiblePanels[activeTabIndex]?.component;

  const [fakeSaving, setFakeSaving] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!hasComponent) {
      setActiveTabIndex(0);
    }
  }, [hasComponent]);

  const addPanel = () => {
    setPanels((panels) => {
      for (const i in panels) {
        const p = panels[i];
        if (!p.visible) {
          const nextPanels = [...panels];
          nextPanels[i] = { ...nextPanels[i], visible: true };
          return nextPanels;
        }
      }
      return panels;
    });
  };

  const fakeHidePanel = (targetPanelId: number) => {
    setPanels((panels) => {
      const nextPanels = panels.map((p) => {
        return p.id !== targetPanelId ? p : { ...p, visible: false };
      });
      if (targetPanelId === 4) {
        const targetIndex = nextPanels.findIndex((p) => p.id === 4);
        const targetPanel = nextPanels[targetIndex];
        nextPanels[targetIndex] = {
          ...targetPanel,
          component: <ThreadPanelWithFakeSingleContent />,
        };
      }
      return nextPanels;
    });
  };

  const renderWelcome = () => (
    <ThreadWelcomeScreen
      setPanels={setPanels}
      onOpenNewPanel={(id) => {
        if (!hasPanels) {
          if (!id) {
            setPanels(
              fakePanelsData.map((p) => ({
                ...p,
                visible: p.id === 2,
              }))
            );
          } else {
            setPanels(
              fakePanelsData.map((p) => ({
                ...p,
                visible: p.id === id,
              }))
            );
          }
        } else {
          const nextPanelIndex = visiblePanels.findIndex((p) => p.id === id);
          if (nextPanelIndex > -1) {
            setActiveTabIndex(nextPanelIndex);
          } else {
            setPanels((panels) => {
              const nextPanels = panels.map((p) =>
                p.id === id ? { ...p, visible: true } : p
              );
              const visiblePanels = panels.filter((p) => p.visible);
              setActiveTabIndex(
                visiblePanels.findIndex((p) => p.id === id) || 0
              );
              return nextPanels;
            });
          }
        }
      }}
    />
  );

  if (!hasPanels) {
    return renderWelcome();
  }

  const currentPanelData = visiblePanels[activeTabIndex];

  return (
    <div className={styles.threadViewContainer}>
      <div className={styles.tabBar}>
        <ScrollingTabsList>
          {visiblePanels.map((panel, index) => (
            <TabButton
              key={panel.id}
              title={panel.threadName}
              isActive={activeTabIndex === index}
              onClick={() => setActiveTabIndex(index)}
              onClose={() => fakeHidePanel(panel.id)}
            >
              {panel.threadName || 'Utas ' + (index + 1)}
            </TabButton>
          ))}
        </ScrollingTabsList>

        <div className={styles.tabActions}>
          <button
            className={clsx(styles.tabButtonBase, styles.tabAddButton)}
            disabled={visiblePanels.length === fakePanelsData.length}
            onClick={addPanel}
          >
            <IoAddSharp size="16" />
          </button>

          {visiblePanels.length > 1 && (
            <QuickActionButton onClick={() => setPanels([])}>
              Tutup semua Utas
            </QuickActionButton>
          )}
        </div>
      </div>

      {currentPanelData?.id !== 1 && (
        <div className={styles.threadHeader}>
          <div className={styles.threadNameHeading}>
            <div>
              <HiOutlineQueueList size="22" />
            </div>
            <h1
              className={styles.threadNameLabel}
              style={
                !currentPanelData?.threadName
                  ? { color: globalStyles.primaryBlue2 }
                  : undefined
              }
            >
              {currentPanelData?.threadName || <>kasih kata kunci&#42;</>}
            </h1>
          </div>
          <QuickActionButton
            truncLabel
            onClick={() => {
              setFakeSaving(true);
              setTimeout(() => {
                setFakeSaving(false);
              }, 600);
            }}
            style={{ color: globalStyles.primaryBlue3 }}
            disabled={fakeSaving}
          >
            {fakeSaving ? (
              <>
                <span className={styles.savingSpinner}>
                  <AiOutlineLoading3Quarters />
                </span>{' '}
                <span>Menyimpan...</span>
              </>
            ) : (
              <span>Simpan Utas?</span>
            )}
          </QuickActionButton>
        </div>
      )}

      <div className={styles.viewerPanelContainer}>
        {currentPanelData
          ? currentPanelData.component || renderWelcome()
          : null}
      </div>
    </div>
  );
}

function ScrollingTabsList({ children }: React.PropsWithChildren) {
  return (
    <ScrollArea.Root className={styles.tabButtonsRail}>
      <ScrollArea.Viewport>
        <div className={styles.tabButtonsList}>{children}</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

function TabButton({
  title,
  isActive,
  onClick,
  onClose,
  children,
}: React.PropsWithChildren<{
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
  title?: string;
}>) {
  const tabRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isActive) {
      tabRef.current?.scrollIntoView?.();
    }
  }, [isActive]);
  return !children ? null : (
    <div
      ref={tabRef}
      className={clsx(styles.tab, isActive ? styles.tabActive : undefined)}
    >
      <button
        className={clsx(
          styles.tabButtonBase,
          styles.tabLabelButton,
          isActive ? styles.tabLabelButtonActive : undefined
        )}
        title={title}
        onClick={onClick}
      >
        {children}
      </button>
      <span className={styles.tabCloseColumn}>
        <button
          className={clsx(styles.tabButtonBase, styles.tabCloseButton)}
          onClick={onClose}
        >
          <IoCloseSharp size="16" />
        </button>
      </span>
    </div>
  );
}

function ThreadPanelScrollableContainer({ children }: React.PropsWithChildren) {
  return (
    <ScrollArea.Root className={styles.viewerPanel}>
      <ScrollArea.Viewport className={styles.viewerPanelScrollable}>
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

function ThreadBottomActions() {
  return (
    <div className={styles.threadBottomActionsContainer}>
      <div className={styles.threadBottomActionsContent}>
        <ul className={clsx(styles.quickActionList, styles.shortcutsButtons)}>
          <li>
            <QuickActionButton
              icon={<RxCardStackPlus size="18" />}
              title="Fitur segera rilis"
            >
              Tulis Catatan
            </QuickActionButton>
          </li>
        </ul>

        <form onSubmit={(ev) => ev.preventDefault()}>
          <input
            type="text"
            className={styles.noteSearchBox}
            placeholder="Ambil Catatan dari repositori..."
          />
        </form>
      </div>
    </div>
  );
}

function ThreadPanelWithFakeSingleContent() {
  const [fakeLoading, setFakeLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (fakeLoading) {
    return (
      <ThreadPanelScrollableContainer>Memuat...</ThreadPanelScrollableContainer>
    );
  }

  return (
    <ThreadPanelScrollableContainer>
      <div className={styles.noteThread}>
        <div className={styles.noteCard}>
          <Par>
            Pura-puranya ini note dengan nomer ID <strong>f1b</strong>.
          </Par>
          <Par>
            Thread dibuka dari screen "welcome" yang belum ada notenya sama
            sekali karena user memilih salah satu note untuk direview: entah
            dari laci atau dari search.
          </Par>
        </div>
      </div>
      <ThreadBottomActions />
    </ThreadPanelScrollableContainer>
  );
}

function ThreadPanelWithFakeOrderedContent() {
  const [fakeLoading, setFakeLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (fakeLoading) {
    return (
      <ThreadPanelScrollableContainer>Memuat...</ThreadPanelScrollableContainer>
    );
  }

  return (
    <ThreadPanelScrollableContainer>
      <div className={styles.noteThread}>
        <div className={styles.noteCard}>
          <Par>
            Pura-puranya ini note dengan nomer ID <strong>f1b</strong>.
          </Par>
          <Par>
            Thread dibuka dari screen "welcome" yang belum ada notenya sama
            sekali karena user memilih salah satu note untuk direview: entah
            dari laci atau dari search.
          </Par>
        </div>

        <div className={styles.noteCard}>
          <Par>
            Note ID <strong>f1c</strong>, lanjutan dari ID <a>f1b</a>.
          </Par>
          <Par>
            Kartu catatan ini otomatis dibubuhkan ke utas di urutan paling
            belakang ketika dipilih dari laci atau dari search. Setiap catatan
            yang diambil selalu ditaruskan di utas yang sedang "aktif".
          </Par>
        </div>
      </div>
      <ThreadBottomActions />
    </ThreadPanelScrollableContainer>
  );
}

function ThreadPanelWithFakeContent() {
  const [fakeLoading, setFakeLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (fakeLoading) {
    return (
      <ThreadPanelScrollableContainer>Memuat...</ThreadPanelScrollableContainer>
    );
  }

  return (
    <ThreadPanelScrollableContainer>
      <div className={styles.noteThread}>
        <div className={styles.noteCard}>
          <Par>
            Screen ini nanti akan jadi tempat untuk ngelihat semua note yang
            sudah disimpan. Tepatnya note permanen: note yang udah masuk
            "slipbox". Semua note nanti akan ditampilkan sedemikian rupa dengan
            suatu format, tapi belum ditentukan wkwk.
          </Par>

          <Par>
            Di sini mungkin bisa juga dimasukkan sekaligus UI untuk nampilkan &
            manage "list" note yang sudah "diurutkan" sesuai topiknya.
          </Par>
        </div>

        <div className={styles.noteCard}>
          <Par>Card note lagi. Tapi beda konten.</Par>
        </div>
      </div>

      <ThreadBottomActions />
    </ThreadPanelScrollableContainer>
  );
}

function ThreadPanelWithFakeLongContent() {
  const [fakeLoading, setFakeLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (fakeLoading) {
    return (
      <ThreadPanelScrollableContainer>Memuat...</ThreadPanelScrollableContainer>
    );
  }

  return (
    <ThreadPanelScrollableContainer>
      <div className={styles.noteThread}>
        <div className={styles.noteCard}>
          <Par>Card note lagi. Tapi beda konten.</Par>
        </div>

        <div className={styles.noteCard}>
          <Par>
            Screen ini nanti akan jadi tempat untuk ngelihat semua note yang
            sudah disimpan. Tepatnya note permanen: note yang udah masuk
            "slipbox". Semua note nanti akan ditampilkan sedemikian rupa dengan
            suatu format, tapi belum ditentukan wkwk.
          </Par>

          <Par>
            Di sini mungkin bisa juga dimasukkan sekaligus UI untuk nampilkan &
            manage "list" note yang sudah "diurutkan" sesuai topiknya.
          </Par>
        </div>

        <div className={styles.noteCard}>
          <Par>Card note lagi. Tapi beda konten.</Par>
        </div>

        <div className={styles.noteCard}>
          <Par>
            Screen ini nanti akan jadi tempat untuk ngelihat semua note yang
            sudah disimpan. Tepatnya note permanen: note yang udah masuk
            "slipbox". Semua note nanti akan ditampilkan sedemikian rupa dengan
            suatu format, tapi belum ditentukan wkwk.
          </Par>

          <Par>
            Di sini mungkin bisa juga dimasukkan sekaligus UI untuk nampilkan &
            manage "list" note yang sudah "diurutkan" sesuai topiknya.
          </Par>
        </div>

        <div className={styles.noteCard}>
          <Par>Card note lagi. Tapi beda konten.</Par>
        </div>

        <div className={styles.noteCard}>
          <Par>
            Screen ini nanti akan jadi tempat untuk ngelihat semua note yang
            sudah disimpan. Tepatnya note permanen: note yang udah masuk
            "slipbox". Semua note nanti akan ditampilkan sedemikian rupa dengan
            suatu format, tapi belum ditentukan wkwk.
          </Par>

          <Par>
            Di sini mungkin bisa juga dimasukkan sekaligus UI untuk nampilkan &
            manage "list" note yang sudah "diurutkan" sesuai topiknya.
          </Par>
        </div>

        <div className={styles.noteCard}>
          <Par>Card note lagi. Tapi beda konten.</Par>
        </div>

        <div className={styles.noteCard}>
          <Par>
            Screen ini nanti akan jadi tempat untuk ngelihat semua note yang
            sudah disimpan. Tepatnya note permanen: note yang udah masuk
            "slipbox". Semua note nanti akan ditampilkan sedemikian rupa dengan
            suatu format, tapi belum ditentukan wkwk.
          </Par>

          <Par>
            Di sini mungkin bisa juga dimasukkan sekaligus UI untuk nampilkan &
            manage "list" note yang sudah "diurutkan" sesuai topiknya.
          </Par>
        </div>

        <div className={styles.noteCard}>
          <Par>Card note lagi. Tapi beda konten.</Par>
        </div>

        <div className={styles.noteCard}>
          <Par>
            Screen ini nanti akan jadi tempat untuk ngelihat semua note yang
            sudah disimpan. Tepatnya note permanen: note yang udah masuk
            "slipbox". Semua note nanti akan ditampilkan sedemikian rupa dengan
            suatu format, tapi belum ditentukan wkwk.
          </Par>

          <Par>
            Di sini mungkin bisa juga dimasukkan sekaligus UI untuk nampilkan &
            manage "list" note yang sudah "diurutkan" sesuai topiknya.
          </Par>
        </div>

        <div className={styles.noteCard}>
          <Par>Card note lagi. Tapi beda konten.</Par>
        </div>

        <div className={styles.noteCard}>
          <Par>
            Screen ini nanti akan jadi tempat untuk ngelihat semua note yang
            sudah disimpan. Tepatnya note permanen: note yang udah masuk
            "slipbox". Semua note nanti akan ditampilkan sedemikian rupa dengan
            suatu format, tapi belum ditentukan wkwk.
          </Par>

          <Par>
            Di sini mungkin bisa juga dimasukkan sekaligus UI untuk nampilkan &
            manage "list" note yang sudah "diurutkan" sesuai topiknya.
          </Par>
        </div>

        <div className={styles.noteCard}>
          <Par>Card note lagi. Tapi beda konten.</Par>
        </div>
      </div>

      <ThreadBottomActions />
    </ThreadPanelScrollableContainer>
  );
}

function StackingNotesThreadsPanel({
  setPanels,
  onOpenThreadPanel,
}: {
  setPanels: React.Dispatch<React.SetStateAction<Panel[]>>;
  onOpenThreadPanel: (id: number) => void;
}) {
  return (
    <div>
      <ul style={{ padding: '1rem', paddingBottom: 0, listStyle: 'none' }}>
        <li>
          <h2 className={styles.quickActionSectionLabel}>Utas</h2>
        </li>
        {[fakePanelsData[1], fakePanelsData[2]].map((p) => (
          <li key={p.id} className={styles.repoDrawerItem}>
            <QuickActionButton
              icon={<HiOutlineRectangleStack size="18" />}
              full
              truncLabel
              onClick={() => onOpenThreadPanel(p.id)}
              title={p.threadName}
            >
              {p.threadName}
            </QuickActionButton>
          </li>
        ))}
      </ul>

      <ul style={{ padding: '1rem', listStyle: 'none' }}>
        <li>
          <h2 className={styles.quickActionSectionLabel}>Catatan</h2>
        </li>
        {[
          { name: 'f1' },
          { name: 'f1a' },
          { name: 'f2' },
          {
            name: 'f1b',
            preview: 'Pura-puranya ini note dengan nomer ID f1b. ...',
          },
          {
            name: 'f1c',
            preview: 'Note ID f1c, lanjutan dari ID f1b. ...',
          },
          { name: '...truncated' },
          { name: 'fokajs98' },
          { name: 'fokajs99' },
        ].map(({ name, preview }) => (
          <li key={name} className={styles.repoDrawerItem}>
            <QuickActionButton
              icon={<BsCardText size="18" />}
              full
              truncLabel
              title={name + (preview ? ` - ${preview}` : '')}
              onClick={() => {
                const run: { [name: string]: () => void } = {
                  f1b: () => {
                    setPanels((panels) => {
                      if (panels.length === 0) {
                        return fakePanelsData.map((p) => ({
                          ...p,
                          visible: p.id === 4,
                        }));
                      } else {
                        return panels.map((p) => ({
                          ...p,
                          visible: p.id === 4 || p.visible,
                        }));
                      }
                    });
                  },

                  f1c: () => {
                    setPanels((panels) => {
                      if (
                        panels.length === 0 ||
                        !panels.find((p) => p.id === 4)
                      ) {
                        return panels;
                      } else {
                        return panels.map((p) =>
                          p.id !== 4
                            ? p
                            : {
                                ...p,
                                component: (
                                  <ThreadPanelWithFakeOrderedContent />
                                ),
                              }
                        );
                      }
                    });
                  },
                };

                run[name]?.();
              }}
            >
              {preview || name}{' '}
              <span
                style={{
                  display: 'inline-block',
                  transform: 'translateY(2px)',
                }}
              >
                <MdUnfoldMore />
              </span>
            </QuickActionButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScreenRepository;
