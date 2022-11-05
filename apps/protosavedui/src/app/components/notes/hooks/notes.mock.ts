import { subDays, addHours, format } from 'date-fns';
import id from 'date-fns/locale/id';
import type { NoteItem } from './notes';

function makeMockNotes(): NoteItem[] {
  const today = new Date();
  const kemarin = subDays(today, 1);
  const kemarinLusa = subDays(today, 2);

  return [...new Array(6)].map((empty: unknown, index: number) => {
    const date: Date = addHours(kemarin, index);
    const item: NoteItem = {
      id: index + 1,
      createdAt: _formatServerDatetime(date),
      note:
        index === 1 || index === 5
          ? 'Pura-puranya markdown\n\n## Pake heading dong wkwk\n\nParagraf biasa tapi [pake link](https://sakitkepala.dev)'
          : markdown,
    };

    if (index < 3) {
      const date = addHours(kemarinLusa, index);
      return {
        ...item,
        createdAt: _formatServerDatetime(date),
      };
    }

    return item;
  });
}

function _formatServerDatetime(date: Date) {
  return format(date, 'yyyy-MM-dd HH:mm:ss', { locale: id });
}

const markdown = `When using CSS property values that don’t exist in some browsers, you’ll often declare the property twice and the older browser will ignore the value it doesn’t understand. This isn’t possible using JS objects as you can’t declare the same key twice. So instead, we use an array to define fallback values.

## Complex Selectors

More complex rules can be written using the selectors key.`;

export { makeMockNotes };
