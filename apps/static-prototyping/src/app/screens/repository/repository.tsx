import * as React from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { IoCloseSharp, IoAddSharp } from 'react-icons/io5';
import { RxCardStackPlus } from 'react-icons/rx';
import { HiOutlineInboxStack, HiOutlineRectangleStack } from 'react-icons/hi2';
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
];

function ScreenRepository() {
  return (
    <div className={styles.fullHeightContainer}>
      <div style={{ width: 280, color: globalStyles.primaryBlue }}>
        side bar
      </div>
      <ThreadWorkspace />
      <div style={{ width: 280, color: globalStyles.primaryBlue }}>
        side bar
      </div>
    </div>
  );
}

function Par({ children }: React.PropsWithChildren) {
  if (!children) return null;
  return <p className={styles.par}>{children}</p>;
}

function ThreadWelcomeScreen({
  onOpenNewPanel,
}: {
  onOpenNewPanel: (id?: number) => void;
}) {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeMainIcon}>
          <HiOutlineInboxStack size="120" />
        </div>

        <div>
          <h2
            className={styles.threadNameLabel}
            style={{ marginBottom: '0.5rem' }}
          >
            Selamat datang di Repositori!
          </h2>
          <Par>
            Silakan me-review catatan-catatan dengan cara mengambil dari laci
            samping, atau temukan menggunakan pencarian di bawah ini.
          </Par>
        </div>

        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            onOpenNewPanel();
          }}
        >
          <input
            type="text"
            className={styles.noteSearchBox}
            placeholder="Temukan catatan dari repositori..."
          />
        </form>

        <div className={styles.welcomeActionsGrid}>
          <div>
            <ul className={styles.quickActionList}>
              <li>
                <QuickActionButton
                  icon={<RxCardStackPlus size="18" />}
                  onClick={() => alert('TODO: Modal tulis catatan baru')}
                >
                  Tulis catatan baru
                </QuickActionButton>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.quickActionSectionLabel}>Utas terakhir</h2>
            <ul className={styles.quickActionList}>
              {[fakePanelsData[1], fakePanelsData[2]].map((p) => (
                <li key={p.id}>
                  <QuickActionButton
                    icon={<HiOutlineRectangleStack size="18" />}
                    onClick={() => onOpenNewPanel(p.id)}
                  >
                    {p.threadName}
                  </QuickActionButton>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton(
  props: { icon?: JSX.Element } & React.ComponentPropsWithoutRef<'button'>
) {
  const { className, children, icon, ...otherProps } = props;
  return (
    <button {...otherProps} className={styles.quickActionButton}>
      {typeof icon !== 'undefined' && (
        <>
          <span>{icon}</span>{' '}
        </>
      )}
      <span className={styles.quickActionButtonLabel}>{children}</span>
    </button>
  );
}

function ThreadWorkspace() {
  const [activeTabIndex, setActiveTabIndex] = React.useState<number>(1);
  const [panels, setPanels] = React.useState<Panel[]>([]);

  const visiblePanels = panels.filter((p) => p.visible);
  const hasPanels = visiblePanels.length > 0;
  const hasComponent =
    visiblePanels[activeTabIndex]?.id !== 1 &&
    visiblePanels[activeTabIndex]?.component;

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
      return nextPanels;
    });
  };

  const renderWelcome = () => (
    <ThreadWelcomeScreen
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
        <div className={styles.tabButtonsRail}>
          {visiblePanels.map((panel, index) => (
            <TabButton
              key={panel.id}
              isActive={activeTabIndex === index}
              onClick={() => setActiveTabIndex(index)}
              onClose={() => fakeHidePanel(panel.id)}
            >
              {panel.threadName || 'Utas Belum Dinamai ' + (index + 1)}
            </TabButton>
          ))}

          <button
            className={clsx(styles.tabButtonBase, styles.tabAddButton)}
            disabled={visiblePanels.length === fakePanelsData.length}
            onClick={addPanel}
          >
            <IoAddSharp size="16" />
          </button>
        </div>

        <div className={styles.tabActions}>
          <QuickActionButton onClick={() => setPanels([])}>
            Tutup semua utas
          </QuickActionButton>
        </div>
      </div>

      <div className={styles.threadHeader}>
        {Boolean(currentPanelData?.threadName) && (
          <div className={styles.threadNameHeading}>
            <div>
              <HiOutlineRectangleStack size="30" />
            </div>
            <h1 className={styles.threadNameLabel}>
              {currentPanelData?.threadName}
            </h1>
          </div>
        )}
      </div>

      <div className={styles.viewerPanelContainer}>
        {currentPanelData
          ? currentPanelData.component || renderWelcome()
          : null}
      </div>
    </div>
  );
}

function TabButton({
  isActive,
  onClick,
  onClose,
  children,
}: React.PropsWithChildren<{
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
}>) {
  return !children ? null : (
    <div className={clsx(styles.tab, isActive ? styles.tabActive : undefined)}>
      <button
        className={clsx(
          styles.tabButtonBase,
          styles.tabLabelButton,
          isActive ? styles.tabLabelButtonActive : undefined
        )}
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
    </ThreadPanelScrollableContainer>
  );
}

export default ScreenRepository;
