import type { NoteItem } from './notes';

function makeMockNotes(): NoteItem[] {
  return [...new Array(6)].map((empty: unknown, index: number) => ({
    type: index === 0 || index === 4 ? 'date' : 'content',
    id: index + 1,
    time: '16:' + (index * 3 + 10),
    note: [
      {
        type: 'p',
        text: `When using CSS property values that don’t exist in some browsers, you’ll often declare the property twice and the older browser will ignore the value it doesn’t understand. This isn’t possible using JS objects as you can’t declare the same key twice. So instead, we use an array to define fallback values.`,
      },
      {
        type: 'p',
        text: `Complex Selectors. More complex rules can be written using the selectors key.`,
      },
    ],
  }));
}

export { makeMockNotes };
