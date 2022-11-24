import { PrismaClient, Note as NoteModel } from '@prisma/client';
import { subDays, addHours } from 'date-fns';
import { format } from 'date-fns';

import id from 'date-fns/locale/id';

const prisma = new PrismaClient();

export type NoteItem = {
  id: number;
  note: string;
  createdAt: string;
};

async function main(): Promise<void> {
  const mockNotes: NoteItem[] = _makeMockNotes();
  try {
    await prisma.note.deleteMany({});
    for (const noteItem of mockNotes) {
      const created: NoteModel = await prisma.note.create({
        data: { note: noteItem.note },
      });
      console.log(`[SUKSES] ${created}`);
    }
    await prisma.$disconnect();
  } catch (dbError) {
    console.error(dbError);
    await prisma.$disconnect();
    process.exit(1);
  }
}

function _makeMockNotes(): NoteItem[] {
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
      createdAt: _formatServerDatetime(date),
      note:
        index === 1 || index === 4
          ? 'Pura-puranya markdown\n\n## Pake heading dong wkwk\n\nParagraf biasa tapi [pake link](https://sakitkepala.dev)'
          : longMarkdown,
    };

    if (index === 0) {
      const date = addHours(kemarinLusa, index);
      return {
        ...item,
        createdAt: _formatServerDatetime(date),
        note: `# Wishlist fitur:\n\n\`\`\`
- [ ] Klik kanan, edit note lewat pilihan di menu konteks
- [ ] Submit pake CTRL+ENTER
- [ ] Panel dock auto renggang ke atas kalau teks semakin panjang
- [ ] Ngetik auto-fokus ke komposer (tanpa harus klik dock komposer)
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
        createdAt: _formatServerDatetime(date),
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
        createdAt: _formatServerDatetime(today),
        note: `## TODO:\n\n\`\`\`
- [ ] Saatnya bikin server GraphQL
- [ ] Pindah data mock notes ke server
\`\`\``,
      };
    }

    return item;
  });
}

function _formatServerDatetime(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm:ss', { locale: id });
}

main();
