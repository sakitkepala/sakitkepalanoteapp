import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: '1fr minmax(40rem, 1fr) 1fr',
  gap: '1rem',
  height: '100%',
  backgroundColor: '#f0f9ff',
});

export const sidebar = style({
  padding: '1rem',
});

export const floatingBrand = style({
  position: 'fixed',
  top: 0,
  left: 0,

  width: '12rem',
  padding: '1rem 2rem',
});

export const logoSaved = style({
  color: '#bcd2ee',
  fontWeight: 800,
  transition: 'color 0.5s ease',
  selectors: {
    '&:hover': { color: '#014f86' },
  },
});

export const floatingProfile = style({
  position: 'fixed',
  top: 0,
  right: 0,

  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  width: '12rem',
  padding: '1rem',
  textAlign: 'right',
});

export const avatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  userSelect: 'none',

  width: 45,
  height: 45,
  borderRadius: '100%',
  backgroundColor: '#bcd2ee',
  verticalAlign: 'middle',

  transition: 'background-color 0.5s ease',

  selectors: {
    '&:hover': {
      backgroundColor: '#014f86',
    },
  },
});

export const fallback = style({
  selectors: {
    [`${avatar} &`]: {
      color: '#f0f9ff',
      fontWeight: 'bold',
    },
  },
});

export const sideMenus = style({
  listStyle: 'none',
  padding: 0,
  marginRight: '0.5rem',
});

export const menuLink = style({
  display: 'block',
  color: '#bcd2ee',
  textDecoration: 'none',

  selectors: {
    [`${sideMenus}:hover a.&`]: {},
    [`${sideMenus} a.&`]: {
      transition: 'color 0.15s ease',
    },
    [`${sideMenus} a.&:hover`]: {
      color: '#ff595e',
    },
  },
});

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

export const separatorDate = style({
  paddingBlock: '1rem',
  color: '#bcd2ee',
  fontWeight: 700,
  textAlign: 'center',
});

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  borderRadius: '0.3rem',
  border: '1px solid #e0f2fe',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#ffffff',
});

export const note = style({
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
