import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { TbPin, TbCapture } from 'react-icons/tb';
import { GrLaunch } from 'react-icons/gr';
import { GoChevronRight } from 'react-icons/go';

import * as globalStyles from '../../global-styles.css';
import * as styles from './captures.css';

function ScreenCaptures() {
  return (
    <div className={styles.screenContainer}>
      <div className={styles.searchPanel}>
        <input
          type="text"
          className={styles.searchBox}
          placeholder="Cari sesuatu..."
        />
      </div>
      <CapturesList />
      {false && <InventoryBar />}
    </div>
  );
}

const fakeItems = [
  {
    type: 'plain',
    content: [`Ngeprototipe UI dengan React.`],
  },
  { type: 'permanent' },
  {
    type: 'plain',
    content: [`Catatan ditulis seperti pesan chat.`],
  },
  {
    type: 'plain',
    content: [`Telegram Saved inspirasiku wkwk 🤘`],
  },
  { type: 'permanent' },
  { type: 'plain' },
  { type: 'plain' },
  {
    type: 'plain',
    quoteReply: `Telegram Saved inspirasiku wkwk 🤘`,
    content: [
      `Fitur Tangkapan ini tempat menyimpan hal-hal yang menarik
      perhatian kita dan dalam waktu dekat nanti pingin kita ingat-
      ingat lagi.`,
    ],
  },
  {
    type: 'permanent',
    content: [
      `Pada dasarnya, halaman "Tangkapan" ini seperti beranda yang
      menunjukkan aktivitas pencatatan yang dibuat di fitur manapun.`,

      `Termasuk catatan permanen yang masuk di repositori akan muncul di
      sini juga sesuai kronologi waktu creatednya. Tapi dia ditampilkan
      seperti ini, yang bisa menunjukkan kalau ini note permanen dari
      repositori.`,

      `Note jenis lain mungkin nanti punya style visual sendiri. Minimal
      yang bisa menandakan identitas jenis notenya yang bisa dikenali
      sepintas sambil lalu.`,
    ],
  },
  {
    type: 'plain',
    content: [
      `Ini note bubble juga, tapi kontennya agak panjang.`,

      `Catatan yang ditulis cepat-cepat bisa ditulis pendek-pendek tapi
      banyak dan nyambung, persis kayak di chat, atau bisa juga ditulis
      dalam satu pesan panjang.`,
    ],
  },
  {
    type: 'plain',
    content: [`Jenis ini bermaksud memfasilitasi use case itu.`],
    quoteReply: `Ini note bubble juga, tapi kontennya agak...`,
  },
].map((item, i) => ({ ...item, id: i + 1 }));

function CapturesList() {
  const [captureItems, setCaptureItems] = React.useState<typeof fakeItems>([]);
  const isFinishDemo = captureItems.length >= fakeItems.length;

  const lastItemDivRef = React.useRef<HTMLDivElement>(null);
  const fakeReplyLongBubbleDivRef = React.useRef<HTMLDivElement>(null);
  const fakeReplyDivRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    lastItemDivRef.current?.scrollIntoView?.();
  }, [captureItems.length]);

  const addItem = () => {
    if (isFinishDemo) {
      return;
    }
    setCaptureItems((items) => {
      const targetDataIndex = items.length;
      const itemToAdd = fakeItems[targetDataIndex];
      return [...items, itemToAdd];
    });
  };

  return (
    <div className={styles.capturesListContainer}>
      {!captureItems.length ? (
        <div className={styles.capturesListRoot}>
          <div className={styles.capturesListWelcomeScreen}>
            <div className={styles.capturesListWelcomeScreenContent}>
              <TbCapture size="72" />
              <h2>Hai!</h2>
              <div>
                Masukkan ke sini semua tangkapan menarik yang mau diingat
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ScrollableCapturesList>
          {captureItems.map((captureItem, index) => {
            const ref: { [index: number]: React.RefObject<HTMLDivElement> } = {
              3: fakeReplyDivRef,
              9: fakeReplyLongBubbleDivRef,
            };

            const getDivRef = (index: number) => {
              return index === captureItems.length - 1
                ? lastItemDivRef
                : ref[index];
            };

            const getQuoteJumpHandler = (index: number) => {
              const ref: { [index: number]: React.RefObject<HTMLDivElement> } =
                {
                  7: fakeReplyDivRef,
                  10: fakeReplyLongBubbleDivRef,
                };

              const divRef = ref[index];

              return !divRef
                ? undefined
                : () => {
                    divRef.current?.scrollIntoView?.({
                      behavior: 'smooth',
                    });
                  };
            };

            return (
              <CaptureItem key={captureItem.id} ref={getDivRef(index)}>
                <CaptureItemContent
                  item={captureItem}
                  onQuoteJump={getQuoteJumpHandler(index)}
                />
              </CaptureItem>
            );
          })}
        </ScrollableCapturesList>
      )}

      <div className={styles.captureInputBar}>
        <div className={styles.captureInputContainer}>
          <div>Fake editor</div>
          <div>
            <button
              className={styles.captureDemoAdd}
              onClick={() => setCaptureItems([])}
            >
              reset
            </button>
            <button className={styles.captureDemoAdd} onClick={addItem}>
              <GrLaunch size="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CaptureItem = React.forwardRef<HTMLDivElement, React.PropsWithChildren>(
  ({ children }, divRef) => {
    return (
      <div ref={divRef} className={styles.captureItem}>
        {children}
      </div>
    );
  }
);

CaptureItem.displayName = 'CaptureItem';

function CaptureItemContent({
  item,
  onQuoteJump,
}: {
  item: {
    type: string;
    quoteReply?: string;
    content?: string[];
  };
  onQuoteJump?: () => void;
}) {
  const renderParagraph = (texts: string[]) => {
    return texts.map((txt, i) => (
      <p key={i} className={styles.par}>
        {txt}
      </p>
    ));
  };

  const comp: { [type: string]: JSX.Element } = {
    plain: !item.content?.length ? (
      <CardFakeShortestContent />
    ) : (
      <NoteBubble quoteReply={item.quoteReply} onQuoteJump={onQuoteJump}>
        {renderParagraph(item.content)}
      </NoteBubble>
    ),

    permanent: !item.content?.length ? (
      <CardFakePermanentNote />
    ) : (
      <CardFakePermanentNote>
        {renderParagraph(item.content)}
      </CardFakePermanentNote>
    ),
  };

  return comp[item.type] || null;
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

function NoteBubble({
  children,
  quoteReply,
  onQuoteJump,
}: React.PropsWithChildren<{
  quoteReply?: string;
  onQuoteJump?: () => void;
}>) {
  return (
    <div className={styles.noteBubble}>
      {Boolean(quoteReply) && (
        <p className={styles.quoteReply} onClick={onQuoteJump}>
          {quoteReply}
        </p>
      )}
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

export default ScreenCaptures;
