import type { NoteItem } from './notes';

function makeMockNotes(): NoteItem[] {
  return [...new Array(6)].map((empty: unknown, index: number) => {
    return {
      type: 'content',
      id: index + 1,
      time: '16:' + (index * 3 + 10),
      note:
        index === 0
          ? 'Pura-puranya markdown\n\n## Pake heading dong wkwk\n\nParagraf biasa tapi [pake link](https://sakitkepala.dev)'
          : markdown,
    };
  });
}

const markdown = `When using CSS property values that don’t exist in some browsers, you’ll often declare the property twice and the older browser will ignore the value it doesn’t understand. This isn’t possible using JS objects as you can’t declare the same key twice. So instead, we use an array to define fallback values.

## Complex Selectors

More complex rules can be written using the selectors key.`;

export { makeMockNotes };
