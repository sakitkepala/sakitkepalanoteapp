import { subDays, addHours } from 'date-fns';
import { formatServerDatetime } from '../utils';

const DEFAULT_LOAD_TIME = 500;

export type NoteItem = {
  id: number;
  note: string;
  createdAt: string;
};

let data: NoteItem[] = makeMockNotes();

const Notes = {
  async getAll(): Promise<NoteItem[]> {
    await fakeLoading();
    return _getAll();
  },

  async getById(id: number): Promise<NoteItem | null> {
    await fakeLoading();
    return _getById(id);
  },

  async create(markdown: string): Promise<NoteItem> {
    await fakeLoading();
    return _create(markdown);
  },
};

function _getAll(): NoteItem[] {
  return [...data].map((item) => ({ ...item }));
}

function _getById(id: number): NoteItem | null {
  const allNotes = _getAll();
  const note = allNotes.find((note) => note.id === id);
  return note || null;
}

function _create(markdown: string): NoteItem {
  const allNotes = _getAll();
  const newNote: NoteItem = {
    id: allNotes.length + 1,
    note: markdown,
    createdAt: formatServerDatetime(new Date()),
  };
  data = [...data, newNote];
  return _getById(newNote.id) as NoteItem;
}

function makeMockNotes(): NoteItem[] {
  const today = new Date();
  const kemarin = subDays(today, 1);
  const kemarinLusa = subDays(today, 2);
  const longMarkdown = `When using CSS property values that don’t exist in some browsers, you’ll often declare the property twice and the older browser will ignore the value it doesn’t understand. This isn’t possible using JS objects as you can’t declare the same key twice. So instead, we use an array to define fallback values.

## Complex Selectors

More complex rules can be written using the selectors key.`;

  return [...new Array(7)].map((empty: unknown, index: number) => {
    const date: Date = addHours(kemarin, index);
    const item: NoteItem = {
      id: index + 1,
      createdAt: formatServerDatetime(date),
      note:
        index === 1 || index === 4
          ? 'Pura-puranya markdown\n\n## Pake heading dong wkwk\n\nParagraf biasa tapi [pake link](https://sakitkepala.dev)'
          : longMarkdown,
    };

    if (index === 0) {
      const date = addHours(kemarinLusa, index);
      return {
        ...item,
        createdAt: formatServerDatetime(date),
        note: `# Wishlist fitur:\n\n\`\`\`
- [ ] Klik kanan, edit note lewat pilihan di menu konteks
- [ ] Submit pake CTRL+ENTER
- [ ] Panel dock auto renggang ke atas kalau teks semakin panjang
- [ ] Ngetik, auto-fokus ke komposer (tanpa harus klik dock komposer)
- [ ] "Reply" catatan dengan catatan lain (mirip reply di chat)
- [ ] Editor/komposer mode penuh
- [ ] Drag and drop upload file + tulis note caption
      - catatan: note (konten) type/category:
        - teks
        - media (gambar dulu sementara)
        - integrasi 3rd party (misal, file google drive,
          item chat telegram, etc.)
- [ ] "Laci" koleksi media
- [ ] Preview konten link
- [ ] Upload & koleksi GIF
\`\`\`

## Wishlist fitur, mode canggih:\n\n\`\`\`
- [ ] Graph view
- [ ] Parsing mark TODO tersebar jadi satu view list TODO global
- [ ] Thinking/processing/creative mode (semacam "board")
\`\`\``,
      };
    }

    if (index < 3) {
      const date = addHours(kemarinLusa, index);
      return {
        ...item,
        createdAt: formatServerDatetime(date),
      };
    }

    if (index === 5) {
      return {
        ...item,
        createdAt: '2022-10-06 17:28',
        note: `## TODO:\n\n\`\`\`- [x] Pasang \`react-query\` buat get & submit data notes\`\`\``,
      };
    }

    if (index === 6) {
      return {
        ...item,
        createdAt: formatServerDatetime(today),
        note: `## TODO:\n\n\`\`\`
- [ ] Saatnya bikin server GraphQL
- [ ] Pindah data mock notes ke server
\`\`\``,
      };
    }

    return item;
  });
}

function fakeLoading(LOAD_TIME = DEFAULT_LOAD_TIME) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(timer);
    }, LOAD_TIME);
  });
}

export default Notes;
