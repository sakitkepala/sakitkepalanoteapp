import { style } from '@vanilla-extract/css';

export const shell = style({
  minHeight: '100vh',
  display: 'grid',
  gridTemplateRows: '1fr min-content',
});

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

export const kbd = style({
  display: 'inline-block',
  padding: '3px 6px',
  borderRadius: 4,
  border: '1px solid #e0f2fe',
  boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#ffffff',
  fontWeight: 700,
});
