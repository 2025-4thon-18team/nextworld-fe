import themeTokens from './themeTokens.js';
import cssVarsPlugin from './cssVarsPlugin.js';
import textStylesPlugin from "../../config/textStylesPlugin.js";
import { convertToRem, wrapColorsWithRgb } from "../../config/utils.js";

const {
  textStyles,
  transitionDuration,
  transitionTimingFunction,
  width,
  height,
  colors: colorsOriginal,
  spacing: spacingOriginal,
  borderRadius: borderRadiusOriginal,
  borderWidth: borderWidthOriginal,
  fontSize: fontSizeOriginal,
  ...restTheme
} = themeTokens;

export default {
  theme: {
    extend: {
      ...restTheme,
      colors: wrapColorsWithRgb(colorsOriginal),
      spacing: convertToRem(spacingOriginal),
      borderRadius: convertToRem(borderRadiusOriginal),
      borderWidth: convertToRem(borderWidthOriginal),
      fontSize: convertToRem(fontSizeOriginal),
    },
  },
  plugins: [cssVarsPlugin, textStylesPlugin],
};
