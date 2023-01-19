import { globalStyle, createVar } from '@vanilla-extract/css';

export const fontKarla = createVar();
export const fontDMSans = createVar();
export const fontFamily = createVar();

export const primaryBlue = createVar();
export const primaryBlue1 = createVar();
export const primaryBlue2 = createVar();
export const primaryBlue3 = createVar();

export const primaryRed = createVar();

globalStyle(':root', {
  boxSizing: 'border-box',
  vars: {
    [fontKarla]: "'Karla', sans-serif",
    [fontDMSans]: "'DM Sans', sans-serif",
    [fontFamily]: fontDMSans,

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
  padding: 0,
  userSelect: 'none',
});

globalStyle('body', {
  overflowX: 'hidden',
  backgroundColor: primaryBlue,
  color: 'rgb(55, 65, 81)',
  fontFamily: fontFamily,
});

globalStyle('body > #root', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});
