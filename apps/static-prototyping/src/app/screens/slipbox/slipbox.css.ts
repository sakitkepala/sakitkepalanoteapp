import { style } from '@vanilla-extract/css';

export const screenContainer = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: '1fr',
});
