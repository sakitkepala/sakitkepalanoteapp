import { style } from '@vanilla-extract/css';

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr minmax(40rem, 1fr) 1fr',
  gap: '1rem',
});

export const gridMiddle = style({
  selectors: {
    [`${gridContainer} &`]: {
      gridColumn: 2,
    },
  },
});

export const stickyBottom = style({
  position: 'sticky',
  bottom: 0,
});
