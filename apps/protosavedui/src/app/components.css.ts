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

export const avatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 45,
  height: 45,
  borderRadius: '100%',
  backgroundColor: '#e0f2fe',
});

export const sideMenus = style({
  listStyle: 'none',
  padding: 0,
  fontSize: '0.8em',
});

export const menuLink = style({
  color: '#0369a1',
  textDecoration: 'none',
  selectors: {
    [`${sideMenus} a.&`]: {
      opacity: 0.25,
    },
    [`${sideMenus} a.&:hover`]: {
      opacity: 1,
    },
  },
});

export const noteList = style({
  marginInline: 'auto',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const startBlock = style({
  paddingBlock: '1rem',
  color: '#0369a1',
  textAlign: 'center',
  opacity: 0.25,
});

export const card = style({
  minHeight: '20rem',
  padding: '2.25rem 2rem',
  borderRadius: '0.5rem',
  border: '1px solid #e0f2fe',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
});
