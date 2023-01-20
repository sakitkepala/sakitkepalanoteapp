import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { TbPin } from 'react-icons/tb';
import { GoChevronRight } from 'react-icons/go';

import * as globalStyles from '../../global-styles.css';
import * as styles from './captures.css';

function ScreenCaptures() {
  return (
    <div className={styles.screenContainer}>
      <CapturesList />
      <InventoryBar />
    </div>
  );
}

function InventoryBar() {
  return (
    <div className={styles.inventoryBarColumn}>
      <div className={styles.inventoryBar}>
        <h2 className={styles.inventorySectionHeading}>
          <TbPin size="20" style={{ transform: 'translateY(4px)' }} /> Dipin
        </h2>
      </div>
    </div>
  );
}

function CapturesList() {
  const lastItemDivRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    lastItemDivRef.current?.scrollIntoView?.();
  }, []);
  return (
    <div className={styles.capturesListContainer}>
      <ScrollableCapturesList>
        <CaptureItem>
          <CardFakeShortestContent />
        </CaptureItem>

        <CaptureItem>
          <CardFakePermanentNote />
        </CaptureItem>

        <CaptureItem>
          <NoteBubble>
            <p className={styles.par}>Catatan ditulis seperti pesan chat.</p>
          </NoteBubble>
        </CaptureItem>

        <CaptureItem>
          <NoteBubble>
            <p className={styles.par}>Telegram Saved inspirasiku wkwk.</p>
          </NoteBubble>
        </CaptureItem>

        <CaptureItem>
          <CardFakePermanentNote />
        </CaptureItem>

        <CaptureItem>
          <CardFakeShortestContent />
        </CaptureItem>

        <CaptureItem>
          <CardFakeShortestContent />
        </CaptureItem>

        <CaptureItem>
          <CardFakePermanentNote>
            <p className={styles.par}>
              Pada dasarnya, halaman "Tangkapan" ini seperti beranda yang
              menunjukkan aktivitas pencatatan yang dibuat di fitur manapun.
            </p>
            <p className={styles.par}>
              Termasuk catatan permanen yang masuk di repositori akan muncul di
              sini juga sesuai kronologi waktu creatednya. Tapi dia ditampilkan
              seperti ini, yang bisa menunjukkan kalau ini note permanen dari
              repositori.
            </p>
            <p className={styles.par}>
              Note jenis lain mungkin nanti punya style visual sendiri. Minimal
              yang bisa menandakan identitas jenis notenya yang bisa dikenali
              sepintas sambil lalu.
            </p>
          </CardFakePermanentNote>
        </CaptureItem>

        <CaptureItem>
          <NoteBubble>
            <p className={styles.par}>
              Ini note bubble juga, tapi kontennya agak panjang.
            </p>
            <p className={styles.par}>
              Catatan yang ditulis cepat-cepat bisa ditulis pendek-pendek tapi
              banyak dan nyambung, persis kayak di chat, atau bisa juga ditulis
              dalam satu pesan panjang.
            </p>
          </NoteBubble>
        </CaptureItem>

        <CaptureItem ref={lastItemDivRef}>
          <NoteBubble
            fakeReply={`Ini note bubble juga, tapi kontennya agak...`}
          >
            <p className={styles.par}></p>
            <p className={styles.par}>
              Jenis ini bermaksud memfasilitasi use case itu.
            </p>
          </NoteBubble>
        </CaptureItem>
      </ScrollableCapturesList>

      <div className={styles.captureInputBar}>
        <div className={styles.captureInputContainer}>Fake editor</div>
      </div>
    </div>
  );
}

function ScrollableCapturesList({ children }: React.PropsWithChildren) {
  return (
    <ScrollArea.Root className={styles.capturesListRoot}>
      <ScrollArea.Viewport className={styles.capturesListViewport}>
        <div className={styles.capturesList}>{children}</div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

const CaptureItem = React.forwardRef<HTMLDivElement, React.PropsWithChildren>(
  ({ children }: React.PropsWithChildren, divRef) => {
    return (
      <div ref={divRef} className={styles.captureItem}>
        {children}
      </div>
    );
  }
);

function NoteBubble({
  children,
  fakeReply,
}: React.PropsWithChildren<{ fakeReply?: string }>) {
  return (
    <div className={styles.noteBubble}>
      {Boolean(fakeReply) && <p className={styles.reply}>{fakeReply}</p>}
      {children}
    </div>
  );
}

function CardFakeShortestContent() {
  return (
    <NoteBubble>
      <p className={styles.par}>note</p>
    </NoteBubble>
  );
}

function NoteCard({ children }: React.PropsWithChildren) {
  return <div className={styles.noteCard}>{children}</div>;
}

function CardFakePermanentNote({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const renderCard = () => {
    if (children) {
      return <NoteCard>{children}</NoteCard>;
    }
    return (
      <NoteCard>
        <p className={styles.par}>
          Pura-puranya ini note dengan nomer ID <strong>f1b</strong>.
        </p>
        <p className={styles.par}>
          Thread dibuka dari screen "welcome" yang belum ada notenya sama sekali
          karena user memilih salah satu note untuk direview: entah dari laci
          atau dari search.
        </p>
      </NoteCard>
    );
  };

  return (
    <React.Fragment>
      {renderCard()}
      <div className={styles.captureItemActionBar}>
        <button
          className={styles.captureItemActionGo}
          onClick={() => navigate('/repository')}
        >
          <GoChevronRight />
        </button>
      </div>
    </React.Fragment>
  );
}

export default ScreenCaptures;
