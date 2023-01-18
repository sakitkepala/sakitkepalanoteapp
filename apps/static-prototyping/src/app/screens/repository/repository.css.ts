import { style, createVar } from '@vanilla-extract/css';
import * as globalStyles from '../../global-styles.css';

const threadCardItemGap = createVar();
const contentParagraphGap = createVar();

export const fullHeightContainer = style({
  selectors: {
    '#root > &': {
      flex: 1,
    },
  },

  display: 'flex',
});

export const welcomeContainer = style({
  flex: '1 0 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const welcomeContent = style({
  width: '25rem',
  paddingTop: '3rem',
  paddingBottom: '10rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const welcomeMainIcon = style({
  color: globalStyles.primaryBlue2,
  textAlign: 'center',
});

export const welcomeActionsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  gap: '0.5rem',
});

export const quickActionSectionLabel = style({
  userSelect: 'none',
  fontSize: '1rem',
  color: globalStyles.primaryBlue2,
  marginBottom: '0.5rem',
});

export const quickActionList = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const quickActionButton = style({
  userSelect: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
  textAlign: 'left',

  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
  color: globalStyles.primaryBlue2,
  ':hover': {
    color: globalStyles.primaryBlue3,
  },
});

export const quickActionButtonLabel = style({
  selectors: {
    [`${quickActionButton}:hover &`]: {
      textDecoration: 'underline',
    },
  },
});

export const threadViewContainer = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
});

export const tabBar = style({
  padding: 3,
  display: 'flex',
});

export const tabButtonsRail = style({
  flex: '1 0 0',
  display: 'flex',
  gap: 1,
  alignItems: 'flex-end',
});

export const tabActions = style({
  flexShrink: 1,
});

export const tabButtonBase = style({
  border: 'none',
  padding: 0,
  margin: 0,
  background: 'none',
  fontFamily: 'inherit',
  cursor: 'pointer',
  userSelect: 'none',
});

export const tabAddButton = style({
  alignSelf: 'center',
  marginLeft: '0.5rem',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.25rem',
  borderRadius: '0.25rem',
  color: globalStyles.primaryBlue3,
  transition: 'background-color 0.15s, color 0.15s',

  ':hover': {
    backgroundColor: globalStyles.primaryBlue3,
    color: globalStyles.primaryBlue,
  },

  ':disabled': {
    cursor: 'default',
    color: globalStyles.primaryBlue2,
  },

  selectors: {
    '&:disabled:hover': {
      backgroundColor: globalStyles.primaryBlue,
    },
  },
});

export const tab = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: globalStyles.primaryBlue,
  ':hover': {
    backgroundColor: globalStyles.primaryBlue1,
  },
});

export const tabActive = style({
  backgroundColor: globalStyles.primaryBlue,
  transition: 'background-color 0.15s',
  ':hover': {
    backgroundColor: globalStyles.primaryBlue,
  },
});

export const tabLabelButton = style({
  // TODO: maxWidth: '...rem',
  padding: '0.5rem 0.125rem 0.5rem 0.75rem',
  color: globalStyles.primaryBlue2,
  transition: 'color 0.15s',
  selectors: {
    [`${tab}:hover &`]: {
      color: globalStyles.primaryBlue3,
    },
  },
});

export const tabLabelButtonActive = style({
  cursor: 'default',
  color: globalStyles.primaryBlue3,
});

export const tabCloseColumn = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingInline: 2,
});

export const tabCloseButton = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: 1,
  borderRadius: '0.25rem',
  backgroundColor: 'transparent',
  color: globalStyles.primaryBlue3,
  opacity: 0,
  transition: 'opacity 0.15s, background-color 0.15s, color 0.15s',

  ':hover': {
    backgroundColor: globalStyles.primaryBlue2,
  },

  selectors: {
    [`${tab}:hover &`]: {
      opacity: 1,
    },
  },
});

export const threadHeader = style({
  minHeight: 'calc(1.5rem + 1rem)',
  padding: '0.5rem',
});

export const threadNameHeading = style({
  color: globalStyles.primaryBlue3,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const threadNameLabel = style({
  color: globalStyles.primaryBlue3,
  fontSize: '1.25rem',
});

export const viewerPanelContainer = style({
  flex: '1 0 0',
  overflow: 'hidden',
});

export const viewerPanel = style({
  flex: '1 0 0',
  width: '100%',
  height: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  overflow: 'hidden',
});

export const noteSearchBox = style({
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

export const viewerPanelScrollable = style({
  width: '100%',
  height: '100%',
});

export const noteThread = style({
  vars: {
    [threadCardItemGap]: '3rem',
    [contentParagraphGap]: '1rem',
  },

  paddingTop: '3rem',
  paddingBottom: '10rem',
  maxWidth: '33.25rem',
  marginInline: 'auto',
});

export const noteCard = style({
  minHeight: '12.5rem',
  padding: '1.75rem 1.5rem',
  borderRadius: '0.5rem',
  backgroundColor: '#ffffff',

  selectors: {
    [`${noteThread} > & + &`]: {
      marginTop: threadCardItemGap,
    },
  },
});

export const par = style({
  selectors: {
    [`${noteCard} > p.& + p.&`]: {
      marginTop: contentParagraphGap,
    },
  },
});
