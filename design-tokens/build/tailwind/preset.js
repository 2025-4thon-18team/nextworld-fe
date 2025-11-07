import themeTokens from './themeTokens.js';
import cssVarsPlugin from './cssVarsPlugin.js';
import textStylesPlugin from "../../config/textStylesPlugin.js";

// px 값을 rem으로 변환하는 함수
const pxToRem = (px, remDivider = 16) => `${px / remDivider}rem`;

// spacing, borderRadius, borderWidth, fontSize를 rem으로 변환
const convertToRem = (obj) => {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    // 숫자 또는 숫자 문자열인 경우 rem으로 변환
    if (typeof value === "number") {
      result[key] = pxToRem(value);
    } else if (typeof value === "string" && !isNaN(Number(value))) {
      result[key] = pxToRem(Number(value));
    } else {
      result[key] = value;
    }
  }
  return result;
};

export default {
  theme: {
    extend: {
      ...themeTokens,
      spacing: convertToRem(themeTokens.spacing),
      borderRadius: convertToRem(themeTokens.borderRadius),
      borderWidth: convertToRem(themeTokens.borderWidth),
      fontSize: convertToRem(themeTokens.fontSize),
    },
  },
  plugins: [cssVarsPlugin, textStylesPlugin],
};
