import { style, createVar } from '@vanilla-extract/css';
import * as global from '../../app.css';

const composerButtonSize = createVar();

export const container = style({
  display: 'flex',
  alignItems: 'flex-end',

  margin: '0.75rem auto 2rem',
  padding: '0.5rem',
  borderRadius: '1rem',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 4px 0 rgb(0, 0, 0, 0.015)',
});

export const editorScrollableArea = style({
  flex: '1 1 auto',
  width: '100%',
  marginBlock: 'auto',

  overflowX: 'hidden',
  overflowY: 'auto',
  maxHeight: '400px',
});

export const editorContainer = style({
  minHeight: composerButtonSize,
});

export const button = style({
  vars: {
    [composerButtonSize]: '2.125rem',
  },

  flex: '0 0 auto',
  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  margin: 0,
  padding: 0,
  width: composerButtonSize,
  height: composerButtonSize,
  border: 'none',
  backgroundColor: 'transparent',
  color: global.primaryBlue2,

  transition: 'color 0.15s',

  ':hover': {
    color: global.primaryBlue3,
  },
});
