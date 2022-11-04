import { style } from '@vanilla-extract/css';

export const container = style({ overflow: 'hidden' });

export const panel = style({
  position: 'relative',
  zIndex: 0,

  display: 'grid',
  gridTemplateRows: 'min-content 1fr',
  height: 160,

  selectors: {
    [`${container}[data-composer-open="true"] &`]: {
      height: 'calc(240px + 2rem)',
    },
  },
});

export const panelFader = style({
  selectors: {
    [`${panel} &`]: {
      height: '4rem',
      background:
        'linear-gradient(to top, ' +
        'rgb(240, 249, 255, 1) 25%, ' +
        'rgb(240, 249, 255, 0)' +
        ')',
    },
  },
});

export const panelBase = style({
  selectors: {
    [`${panel} &`]: {
      borderTop: '2px solid #e0f2fe',
      backgroundColor: 'rgb(240, 249, 255)',
    },
  },
});

export const composerContainer = style({
  position: 'absolute',
  zIndex: 0,
  bottom: 0,
  insetInline: 0,
});

export const commander = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem',

  color: '#bcd2ee',
  fontWeight: 700,
  cursor: 'text',
  transition: 'opacity 0.15s ease',

  selectors: {
    [`${composerContainer}:hover &`]: {
      opacity: 0,
    },
  },
});

export const composer = style({
  position: 'absolute',
  zIndex: 1,
  insetInline: 0,
  bottom: 0,

  display: 'grid',
  gridTemplateColumns: '1fr 460px 1fr',
  alignItems: 'end',

  transform: 'translateY(100%) rotateZ(1deg)',
});

export const card = style({
  gridColumn: 2,
  height: 200,
  backgroundColor: '#ffffff',
  cursor: 'text',
  transform: 'translateY(10%)',
});
