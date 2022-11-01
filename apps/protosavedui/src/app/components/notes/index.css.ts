import { style } from '@vanilla-extract/css';

export const noteList = style({
  marginInline: 'auto',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.25rem',
});

export const separatorBlock = style({
  paddingBlock: '1rem',
  color: '#bcd2ee',
  fontWeight: 700,
  textAlign: 'center',
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  borderRadius: '0.6rem',
  border: '1px solid #e0f2fe',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#ffffff',
});

export const text = style({
  selectors: {
    [`${card} &`]: {
      paddingTop: '2.25rem',
      paddingInline: '2rem',
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
