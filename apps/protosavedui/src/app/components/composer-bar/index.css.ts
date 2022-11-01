import { style } from '@vanilla-extract/css';
import { card } from '../notes/index.css';

export const panel = style({
  position: 'relative',
  zIndex: 0,
});

export const fader = style({
  selectors: {
    [`${panel} &`]: {
      height: '4rem',
      background:
        'linear-gradient(to top, rgba(240, 249, 255, 1) 25%, ' +
        'rgba(240, 249, 255, 0))',
    },
  },
});

export const composerTrigger = style({
  borderTop: '1px solid #e0f2fe',
  display: 'flex',
  justifyContent: 'space-between',
  color: '#bcd2ee',
  fontWeight: 700,
  cursor: 'text',
  transition: 'color 0.15s ease',

  selectors: {
    [`${panel} &`]: {
      padding: '2rem',
      backgroundColor: '#f0f9ff',
    },
    [`${panel}:hover &`]: {
      color: 'rgba(240, 249, 255, 0)',
    },
  },
});

export const composerOverlay = style({
  overflow: 'hidden',
  pointerEvents: 'none',

  position: 'absolute',
  zIndex: 0,
  insetInline: 0,
  bottom: 0,
  height: '100vh',

  selectors: {
    [`&[data-composer-active="true"]`]: {
      pointerEvents: 'all',
    },
  },
});

export const composerTriggerCard = style({
  selectors: {
    [`${panel} ${card}&`]: {
      pointerEvents: 'all',
      cursor: 'text',
      height: '8rem',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      borderBottom: 'none',
      color: 'rgb(55, 65, 81, 0.25)',
      fontWeight: 700,

      position: 'absolute',
      insetInline: '1rem',
      bottom: 0,
      transform: 'translateY(95%) rotate(1deg)',
      transformOrigin: 'top right',
      transition:
        'transform 0.35s ease, boxShadow 0.35s ease, ' +
        'border-color 0.15s ease',
    },

    [`${panel}:hover &`]: {
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
      transform: 'translateY(40%) rotate(1deg)',
    },

    [`${panel} ${composerOverlay}[data-composer-active="true"] &`]: {
      borderColor: '#e0f2fe',
      outline: '1px solid #e0f2fe',
      transform: 'translateY(10%) rotate(0)',
    },
  },
});

export const placeholder = style({
  userSelect: 'none',
});

export const kbd = style({
  display: 'inline-block',
  padding: '3px 6px',
  borderRadius: 4,
  border: '1px solid #e0f2fe',
  boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#ffffff',
  fontWeight: 700,
});
