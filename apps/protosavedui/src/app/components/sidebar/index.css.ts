import { style } from '@vanilla-extract/css';

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
  userSelect: 'none',
  color: '#bcd2ee',
  fontWeight: 800,
  letterSpacing: -4,
  transition: 'color 0.4s ease',
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
  fontWeight: 700,
  textDecoration: 'none',

  selectors: {
    [`${sideMenus}:hover a.&`]: {},
    [`${sideMenus} a.&`]: {
      transition: 'color 0.15s ease',
    },
    [`${sideMenus} a.&:hover`]: {
      color: '#ed4245',
    },
  },
});
