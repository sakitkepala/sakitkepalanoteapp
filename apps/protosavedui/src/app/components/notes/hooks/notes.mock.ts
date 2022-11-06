import { subDays, addHours, format } from 'date-fns';
import id from 'date-fns/locale/id';
import { formatServerDatetime } from '../utils';

import type { NoteItem } from './notes';

const DEFAULT_LOAD_TIME = 500;
let data: NoteItem[] = makeMockNotes();

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
  const longMarkdown: string = `When using CSS property values that don’t exist in some browsers, you’ll often declare the property twice and the older browser will ignore the value it doesn’t understand. This isn’t possible using JS objects as you can’t declare the same key twice. So instead, we use an array to define fallback values.

## Complex Selectors

More complex rules can be written using the selectors key.`;

  return [...new Array(7)].map((empty: unknown, index: number) => {
    const date: Date = addHours(kemarin, index);
    const item: NoteItem = {
      id: index + 1,
      createdAt: formatServerDatetime(date),
      note:
        index === 1 || index === 5
          ? 'Pura-puranya markdown\n\n## Pake heading dong wkwk\n\nParagraf biasa tapi [pake link](https://sakitkepala.dev)'
          : longMarkdown,
    };

    if (index < 3) {
      const date = addHours(kemarinLusa, index);
      return {
        ...item,
        createdAt: formatServerDatetime(date),
      };
    }

    if (index === 6) {
      return {
        ...item,
        createdAt: formatServerDatetime(today),
        note: `## TODO:\n\n\`\`\`- [ ] Pasang \`react-query\` buat get & submit data notes\`\`\``,
      };
    }

    return item;
  });
}

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

function fakeLoading(LOAD_TIME = DEFAULT_LOAD_TIME) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(timer);
    }, LOAD_TIME);
  });
}

export default Notes;
