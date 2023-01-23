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

export const sidebar = style({
  overflow: 'hidden',
  flexShrink: 1,
  minWidth: '20rem',
});

export const searchPanel = style({
  padding: '1rem 0.5rem',
});

export const searchBox = style({
  display: 'block',
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: 'none',
  borderRadius: '0.5rem',
  backgroundColor: globalStyles.primaryBlue1,
  color: 'inherit',
  fontFamily: 'inherit',
  '::placeholder': {
    color: globalStyles.primaryBlue2,
  },
});

export const capturesListPanel = style({
  flexGrow: 1,
  paddingBlock: 4,
  display: 'flex',
  flexDirection: 'column',
  minWidth: '20rem',
  maxWidth: '43.75rem',
});

export const capturesListWelcomeScreen = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const capturesListWelcomeScreenContent = style({
  maxWidth: '18.75rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '1rem',
  alignItems: 'center',
  color: globalStyles.primaryBlue2,
  fontSize: 14,
  textAlign: 'center',
});

export const captureInputPanel = style({
  flexShrink: 0,
  padding: '1rem 0.5rem',
  backgroundColor: globalStyles.primaryBlue,
});

export const captureInputContainer = style({
  borderRadius: '0.5rem',
  backgroundColor: globalStyles.primaryBlue1,
  display: 'flex',
});

globalStyle(`${captureInputContainer} > *:nth-child(1)`, {
  flexGrow: 1,
  padding: '1.5rem',
  userSelect: 'text',
  verticalAlign: 'middle',
});

globalStyle(`${captureInputContainer} > *:nth-child(2)`, {
  flexShrink: 0,
  alignSelf: 'flex-end',
  padding: '1rem',
  display: 'flex',
  alignItems: 'flex-start',
});

export const captureDemoAdd = style({
  border: 'none',
  padding: '0.5rem',
  width: '2.25rem',
  height: '2.25rem',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: globalStyles.primaryBlue2,
  },

  selectors: {
    '&:disabled:hover': {
      backgroundColor: globalStyles.primaryBlue,
    },
  },
});

export const capturesListRoot = style({
  overflow: 'hidden',
  height: '100%',
  width: '100%',
  minWidth: '20rem',
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

export const quoteReply = style({
  marginBottom: '0.625rem',
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

export const inventoryPanel = style({
  padding: '0.5rem',
});

export const pinBoard = style({
  padding: '1.25rem',
  borderRadius: '0.5rem',
  backgroundColor: '#ffffff',
});

export const pinBoardSectionHeading = style({
  fontSize: '1rem',
  color: globalStyles.primaryBlue2,
});
