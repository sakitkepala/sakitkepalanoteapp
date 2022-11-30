import { style, keyframes } from '@vanilla-extract/css';

const blink = keyframes({
  '0%': { transform: 'scaleY(100%)' },
  '30%': { transform: 'scaleY(0)' },
  '60%': { transform: 'scaleY(100%)' },
});

export const cursorContainer = style({
  display: 'inline-block',
  position: 'relative',
  height: '1em',
});

export const cursorIndicator = style({
  position: 'absolute',
  insetInline: 0,
  top: 0,

  height: 'calc(1em + 4px)',
  width: 6,
  backgroundColor: 'currentColor',

  animation: `1s ${blink} infinite`,
});
