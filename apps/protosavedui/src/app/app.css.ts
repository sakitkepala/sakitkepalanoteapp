import { globalStyle, style } from '@vanilla-extract/css';

globalStyle(':root', {
  boxSizing: 'border-box',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'inherit',
  margin: 0,
});

globalStyle('body', {
  color: 'rgb(55, 65, 81)',
  fontFamily: "'Karla', sans-serif",
});

globalStyle('#root', {
  display: 'grid',
  gridTemplateRows: 'min-content 1fr',
  minHeight: '100vh',
});

globalStyle('#root > *:last-child', {
  placeSelf: 'center',
  width: '100%',
});

export const flow = style({});

globalStyle(`${flow} > * + *`, {
  marginTop: '0.75em',
});
