import { style } from '@vanilla-extract/css';
import * as global from '../../app.css';

export const noteList = style({
  marginInline: 'auto',
  padding: '2rem 4rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '1.25rem',
});

export const separatorBlock = style({
  width: '100%',
  paddingBlock: '1rem',
  color: global.primaryBlue3,
  fontWeight: 700,
  textAlign: 'center',
});

export const bubble = style({
  display: 'inline-block',
  padding: '0.5rem 1rem',
  borderRadius: '1rem',
  backgroundColor: 'rgb(255, 255, 255, 0.5)',
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  minWidth: '65%',
  borderRadius: '0.375rem',
  border: '1px solid ' + global.primaryBlue1,
  backgroundColor: '#ffffff',

  transition: 'box-shadow 0.3s, border-color 0.15s',

  ':hover': {
    boxShadow: '0 3px 3px 0 rgb(0, 0, 0, 0.04)',
    borderColor: global.primaryBlue2,
  },
});

export const text = style({
  selectors: {
    [`${card} &`]: {
      paddingTop: '1.25rem',
      paddingInline: '1.5rem',
      lineHeight: 1.6,
    },
  },
});

export const status = style({
  selectors: {
    [`${card} &`]: {
      display: 'flex',
      gap: '0.75rem',
      justifyContent: 'flex-end',

      padding: '0.5rem 0.875rem',
      color: '#bcd2ee',
      fontSize: '0.75em',
      fontFamily: 'mono',
      textAlign: 'right',
    },
  },
});
