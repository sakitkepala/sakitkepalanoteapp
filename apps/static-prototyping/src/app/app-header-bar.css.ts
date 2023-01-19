import { style } from '@vanilla-extract/css';
import * as globalStyles from './global-styles.css';

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderBottom: `1px solid ${globalStyles.primaryBlue1}`,
});

export const navBar = style({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.4rem',
});

export const navMenus = style({
  display: 'flex',
  gap: '0.5rem',
});

export const navMenuLink = style({
  padding: '0.25rem 0.625rem',
  borderRadius: 4,
  fontSize: 14,
  textDecoration: 'none',
  color: globalStyles.primaryBlue3,
  fontWeight: 600,
  ':hover': {
    backgroundColor: globalStyles.primaryBlue1,
  },
});

export const navMenuLinkActive = style({
  selectors: {
    [`${navMenuLink}&`]: {
      backgroundColor: globalStyles.primaryBlue1,
    },
  },
});
