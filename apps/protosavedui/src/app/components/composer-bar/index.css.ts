import { style } from '@vanilla-extract/css';
import { gridContainer } from '../../components.css';
import { card as cardGlobal } from '../notes/index.css';

export const panel = style({
  display: 'grid',
  gridTemplateRows: 'min-content 1fr',
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

export const commanderContainer = style({
  borderTop: '1px solid #e0f2fe',
  backgroundColor: '#f0f9ff',

  selectors: {
    [`*[data-composer-active="true"] &`]: {
      height: 200,
    },
  },
});

export const commander = style({
  display: 'flex',
  justifyContent: 'space-between',
  color: '#bcd2ee',
  fontWeight: 700,
  cursor: 'text',
  transition: 'opacity 0.15s ease',

  selectors: {
    [`${panel} &`]: {
      padding: '2rem',
      backgroundColor: '#f0f9ff',
    },

    [`${panel}:hover &`]: {
      opacity: 0,
    },

    [`*[data-composer-active="true"] &`]: {
      opacity: 0,
    },
  },
});

export const composerContainer = style({
  position: 'absolute',
  zIndex: 0,
  insetInline: 0,
  bottom: 0,
  height: '100vh',
  pointerEvents: 'none',
  overflow: 'hidden',

  selectors: {
    [`${gridContainer} &`]: {
      gridTemplateRows: '1fr min-content',
    },
  },
});

export const composer = style({
  gridRow: 2,
});

export const card = style({
  pointerEvents: 'all',
  cursor: 'text',

  transform: 'translateY(95%) rotate(1deg)',
  transformOrigin: 'top right',
  transition:
    'transform 0.35s ease, ' +
    'boxShadow 0.35s ease, ' +
    'border-color 0.15s ease',

  height: 'calc(200px - 2rem)',
  color: 'rgb(55, 65, 81, 0.25)',
  fontWeight: 700,

  selectors: {
    [`${cardGlobal}&`]: {
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
      borderBottom: 'none',
    },

    [`${panel}:hover + ${composerContainer}:not([data-composer-active="true"]) &, &:hover`]:
      {
        transitionDelay: '0.1s',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
        transform: 'translateY(60%) rotate(1deg)',
      },

    [`*[data-composer-active="true"] &`]: {
      borderColor: '#e0f2fe',
      outline: '1px solid #e0f2fe',
      transform: 'translateY(0) rotate(0)',
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
