import themeTokens from "./themeTokens.js";
import cssVarsPlugin from "./cssVarsPlugin.js";
import textStylesPlugin from "../../config/textStylesPlugin.js";

// px 값을 rem으로 변환하는 함수
const pxToRem = (px, remDivider = 16) => `${px / remDivider}rem`;

/**
 * spacing, borderRadius, borderWidth, fontSize를 rem으로 변환
 * @param {Record<string, number | string>} obj
 * @returns {Record<string, string>}
 */
const convertToRem = (obj) => {
  /** @type {Record<string, string>} */
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

// 빈 객체 필터링
const filterEmpty = (obj) => {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === "object" && Object.keys(value).length === 0) {
      continue;
    }
    result[key] = value;
  }
  return result;
};

const {
  textStyles,
  transitionDuration,
  transitionTimingFunction,
  width,
  height,
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
      spacing: convertToRem(spacingOriginal),
      borderRadius: convertToRem(borderRadiusOriginal),
      borderWidth: convertToRem(borderWidthOriginal),
      fontSize: convertToRem(fontSizeOriginal),
    },
  },
  plugins: [cssVarsPlugin, textStylesPlugin],
};
