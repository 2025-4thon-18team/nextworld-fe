import * as tokens from './dist/js/tokens.js';

export default {
  theme: {
    extend: {
      colors: {
        primary: tokens.color.primary,
        secondary: tokens.color.secondary,
        background: tokens.color.background,
      },
      spacing: {
        sm: tokens.spacing.sm,
        md: tokens.spacing.md,
        lg: tokens.spacing.lg,
      },
    },
  },
};
