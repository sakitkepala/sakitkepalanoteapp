import { globalStyle, style, createVar } from '@vanilla-extract/css';

export const primaryBlue = createVar();
export const primaryBlue1 = createVar();
export const primaryBlue2 = createVar();
export const primaryBlue3 = createVar();

export const primaryRed = createVar();

globalStyle(':root', {
  boxSizing: 'border-box',
  vars: {
    [primaryBlue]: '#e0ebef', // alice blue
    [primaryBlue1]: '#d4e0e6',
    [primaryBlue2]: '#becbd5',
    [primaryBlue3]: '#1d3557',

    [primaryRed]: '#ed4245',
  },
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'inherit',
  margin: 0,
});

globalStyle('body', {
  overflowX: 'hidden',
  backgroundColor: primaryBlue,
  color: 'rgb(55, 65, 81)',
  fontFamily: "'Karla', sans-serif",
  fontSize: '0.875rem',
});

globalStyle('code', {
  fontSize: '0.8125rem',
  whiteSpace: 'pre-wrap',
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
