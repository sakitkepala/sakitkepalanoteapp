import { style } from '@vanilla-extract/css';
import * as global from '../../app.css';

export const bubble = style({
  margin: '0.75rem auto 2rem',

  display: 'flex',
  alignItems: 'center',

  minHeight: '6rem',
  borderRadius: '1rem',
  background: '#ffffff',
  boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.015)',
});

export const bubbleInner = style({
  marginInline: 'auto',

  display: 'grid',
  gridTemplateColumns: '1fr 30rem 1fr',
  gap: '1rem',
  alignItems: 'end',

  paddingBlock: '1rem',
});

export const editorContainer = style({
  gridColumn: '2',
});

export const button = style({
  cursor: 'pointer',
  margin: 0,
  padding: 0,
  borderWidth: 1,
  borderColor: 'transparent',
  backgroundColor: 'transparent',
  color: global.primaryBlue2,

  transition: 'color 0.15s',

  ':hover': {
    color: global.primaryBlue3,
  },
});
