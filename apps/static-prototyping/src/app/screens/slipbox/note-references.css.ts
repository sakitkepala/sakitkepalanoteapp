import { globalStyle, style } from '@vanilla-extract/css';

export const wrapper = style({ marginTop: '2.5rem' });

globalStyle(`${wrapper} > * + *`, {
  marginTop: '2rem',
});

export const headingLabel = style({
  // fontWeight: 'normal',
  fontSize: '0.875rem',
  marginBottom: '0.5rem',
});
