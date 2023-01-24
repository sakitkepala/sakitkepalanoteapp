import { style, createVar, globalStyle, keyframes } from '@vanilla-extract/css';
import * as globalStyles from '../../global-styles.css';

const threadCardItemGap = createVar();
const contentParagraphGap = createVar();

export const tabButtonBase = style({
  border: 'none',
  padding: 0,
  margin: 0,
  background: 'none',
  fontSize: 14,
  fontFamily: 'inherit',
  cursor: 'pointer',
  userSelect: 'none',
});

export const screenRepositoryContainer = style({
  selectors: {
    '#root > &': {
      flex: '1 0 0',
    },
  },

  display: 'flex',
  justifyContent: 'center',
});

export const repoPanel = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const repoTabBar = style({
  padding: '3px 0',
  flexShrink: 0,
  minHeight: 34,
  display: 'flex',
  justifyContent: 'center',
  // UNDECIDING:
  // borderBottom: 'solid 1px ' + globalStyles.primaryBlue2,
});

export const repoTabButton = style({
  padding: '0.5rem 0.75rem',
  backgroundColor: globalStyles.primaryBlue,
  color: globalStyles.primaryBlue2,
  transition: 'color 0.15s',
  ':hover': {
    borderRadius: 2,
    backgroundColor: globalStyles.primaryBlue1,
    color: globalStyles.primaryBlue3,
  },
});

export const repoTabButtonActive = style({
  cursor: 'default',
  color: globalStyles.primaryBlue3,
});

export const repoContentPanel = style({
  flex: '1 0 0',
  height: '100%',
  overflow: 'hidden',
  padding: 3,
  // UNDECIDING:
  // backgroundColor: globalStyles.primaryBlue1,
});

export const repoContentPanelViewport = style({
  width: '100%',
  height: '100%',
});

export const repoNoteList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  // padding: '0.75rem 1rem',
  padding: '0 1rem',
});

export const repoNoteCardItem = style({
  minHeight: 54,
  padding: '0.5rem 0.75rem',
  borderRadius: 6,
  border: 'solid 1px ' + globalStyles.primaryBlue2,
  boxShadow: '0 1px 0 ' + globalStyles.primaryBlue2,
  backgroundColor: globalStyles.primaryBlue,
  fontSize: 14,
  display: 'flex',
  gap: '1rem',
  cursor: 'pointer',
  transition: 'background-color 0.15s, border-color 0.15s',
  ':hover': {
    backgroundColor: '#ffffff',
    borderColor: globalStyles.primaryBlue1,
    // borderBottomColor: globalStyles.primaryBlue1,
    boxShadow: '0 1px 0 ' + globalStyles.primaryBlue1,
  },
});

export const repoNoteCardIcon = style({
  color: globalStyles.primaryBlue2,
});

export const repoDrawerItem = style({
  padding: '1px 4px 0 4px',
  ':hover': {
    borderRadius: 2,
    backgroundColor: globalStyles.primaryBlue1,
  },
});

export const welcomeContainer = style({
  flex: '1 0 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '43.75rem',
  height: '100%',
  overflow: 'hidden',
});

export const welcomeContent = style({
  width: '25rem',
  paddingTop: '3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

export const welcomeMainIcon = style({
  color: globalStyles.primaryBlue2,
  textAlign: 'center',
});

export const welcomeActionsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  gap: '1rem',
});

export const quickActionSectionLabel = style({
  userSelect: 'none',
  fontSize: '0.875rem',
  color: globalStyles.primaryBlue2,
  marginBottom: '0.5rem',
});

export const quickActionPreviewNoteCardList = style({});

globalStyle(`${quickActionPreviewNoteCardList} > * + *`, {
  marginTop: 5,
});

export const quickActionBaseCardButton = style({
  border: 'none',
  fontFamily: 'inherit',
  cursor: 'pointer',
  width: '100%',
  padding: '0.5rem',
  borderRadius: 6,
  fontSize: 14,
});

export const quickActionAddNoteCard = style({
  border: 'solid 1px ' + globalStyles.primaryBlue1,
  backgroundColor: globalStyles.primaryBlue,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  color: globalStyles.primaryBlue2,

  ':hover': {
    backgroundColor: globalStyles.primaryBlue1,
  },
});

export const quickActionPreviewNoteCard = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  color: globalStyles.primaryBlue2,
});

export const latestNotePreviewText = style({
  color: 'rgb(55, 65, 81)',
});

export const shortcutsButtons = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
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

  selectors: {
    '&:disabled:hover': {
      cursor: 'default',
      color: globalStyles.primaryBlue2,
    },
  },
});

export const quickActionButtonFull = style({
  width: '100%',
});

export const quickActionButtonLabel = style({
  selectors: {
    [`${quickActionButton}:hover &`]: {
      textDecoration: 'underline',
    },
    [`${quickActionButton}:disabled:hover &`]: {
      textDecoration: 'none',
    },
  },
});

export const quickActionButtonLabelTrunc = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const threadViewContainer = style({
  flex: '1 0 0',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '43.75rem',
  paddingInline: '1rem',
});

export const tabBar = style({
  padding: 3,
  display: 'flex',
  gap: '0.5rem',
});

export const tabButtonsRail = style({
  flexShrink: 1,
  overflow: 'hidden',
});

export const tabButtonsList = style({
  display: 'flex',
  gap: 1,
});

export const tabActions = style({
  flexGrow: 1,
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
  alignItems: 'center',
  minHeight: 34,
});

export const tabAddButton = style({
  alignSelf: 'center',

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
    borderRadius: 2,
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
  maxWidth: '13rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
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
  display: 'flex',
  alignItems: 'center',
});

export const savingSpinner = style({
  display: 'inline-block',
  marginRight: 2,
});

const spinning = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

globalStyle(`${savingSpinner} > svg`, {
  animation: `${spinning} 0.625s infinite linear`,
});

export const threadNameHeading = style({
  flexGrow: 1,
  color: globalStyles.primaryBlue3,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const threadNameLabel = style({
  userSelect: 'text',
  color: globalStyles.primaryBlue3,
  fontSize: '1.125rem',
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
    [threadCardItemGap]: '0.75rem',
    [contentParagraphGap]: '1rem',
  },

  paddingTop: '3rem',
  // paddingBottom: '10rem',
  maxWidth: '33.25rem',
  marginInline: 'auto',
});

export const noteCard = style({
  userSelect: 'text',
  minHeight: '12.5rem',
  padding: '1.75rem 1.5rem',
  borderRadius: 6,
  backgroundColor: '#ffffff',

  selectors: {
    [`${noteThread} > & + &`]: {
      marginTop: threadCardItemGap,
    },
  },
});

globalStyle(`${noteCard} *`, {
  userSelect: 'auto',
});

export const par = style({
  selectors: {
    [`${noteCard} > p& + p&`]: {
      marginTop: contentParagraphGap,
    },
  },
});

export const threadBottomActionsContainer = style({
  marginTop: '5rem',
  marginBottom: '10rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const threadBottomActionsContent = style({
  width: '25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});
