import { style } from '@vanilla-extract/css';
import * as globalStyles from '@noteapp/global-styles';
import { composerButtonSize } from './vars.css';

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
  color: globalStyles.primaryBlue2,

  transition: 'color 0.15s',

  ':hover': {
    color: globalStyles.primaryBlue3,
  },

  ':disabled': {
    cursor: 'default',
  },
});
