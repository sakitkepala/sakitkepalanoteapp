import { style } from '@vanilla-extract/css';
import * as globalStyles from '@noteapp/global-styles';

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
  zIndex: 1,
  bottom: 0,
  backgroundColor: globalStyles.primaryBlue,
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
