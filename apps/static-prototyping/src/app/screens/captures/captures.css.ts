import { style, globalStyle } from '@vanilla-extract/css';
import * as globalStyles from '../../global-styles.css';

export const screenContainer = style({
  display: 'flex',
  overflow: 'hidden',
  justifyContent: 'center',
});

globalStyle(`#root > ${screenContainer}`, {
  flex: '1 0 0', // <- ini yang bikin berhasil `overflow: hidden`, flex-basis diset ke `0`
});

export const capturesListContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const captureInputBar = style({
  flexShrink: 0,
  padding: '1rem 0.5rem',
  backgroundColor: globalStyles.primaryBlue,
});

export const captureInputContainer = style({
  padding: '1.5rem',
  borderRadius: '0.5rem',
  backgroundColor: globalStyles.primaryBlue1,
  userSelect: 'text',
});

export const capturesListRoot = style({
  overflow: 'hidden',
  height: '100%',
  width: 700,
});

export const capturesListViewport = style({
  width: '100%',
  height: '100%',
});

export const capturesList = style({
  padding: '3rem 0 6rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '0.75rem',
});

export const captureItem = style({
  width: '33.25rem',
  display: 'flex',
});

export const captureItemActionBar = style({
  alignSelf: 'flex-end',
  padding: '1rem',
});

export const captureItemActionGo = style({
  selectors: {
    [`button&`]: {
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      backgroundColor: 'rgb(255, 255, 255, 0.25)',
      color: globalStyles.primaryBlue2,
    },

    [`button&:hover`]: {
      backgroundColor: 'rgb(255, 255, 255, 0.5)',
    },
  },
});

export const noteBubble = style({
  userSelect: 'text',
  minWidth: '10rem',
  maxWidth: '33.25rem',
  padding: '1.125rem 1rem',
  borderRadius: '1rem',
  backgroundColor: 'rgb(255, 255, 255, 0.4)',
});

export const noteCard = style({
  userSelect: 'text',
  minWidth: '12rem',
  maxWidth: '33.25rem',
  padding: '1.75rem 1.5rem',
  borderRadius: 6,
  backgroundColor: '#ffffff',
});

globalStyle(`${noteBubble} *, ${noteCard} *`, {
  userSelect: 'auto',
});

export const par = style({
  selectors: {
    [`${noteBubble} > p& + p&, ${noteCard} > p& + p&`]: {
      marginTop: '1rem',
    },
  },
});

export const reply = style({
  padding: '2px 10px',
  borderLeft: 'solid 5px ' + globalStyles.primaryBlue,
  color: globalStyles.primaryBlue2,
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  cursor: 'pointer',
  userSelect: 'none',
});

export const inventoryBarColumn = style({
  padding: '0.5rem',
  width: 360,
});

export const inventoryBar = style({
  width: '100%',
  maxHeight: '100%',
  padding: '1.25rem',
  borderRadius: '0.5rem',
  backgroundColor: '#ffffff',
});

export const inventorySectionHeading = style({
  fontSize: '1.125rem',
  color: globalStyles.primaryBlue2,
});
