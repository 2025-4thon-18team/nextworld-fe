// px 값을 rem으로 변환하는 함수
const pxToRem = (px, remDivider = 16) => `${px / remDivider}rem`;

/**
 * spacing, borderRadius, borderWidth, fontSize를 rem으로 변환
 * @param {Record<string, number | string>} obj
 * @returns {Record<string, string>}
 */
export const convertToRem = (obj) => {
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

/**
 * RGB 채널 색상 값을 rgb() 함수로 감싸기
 * @param {Record<string, string>} colors
 * @returns {Record<string, string>}
 */
export const wrapColorsWithRgb = (colors) => {
  /** @type {Record<string, string>} */
  const result = {};
  for (const [key, value] of Object.entries(colors)) {
    // "155 113 226" 형태의 RGB 채널 값을 "rgb(155 113 226 / <alpha-value>)" 형태로 변환
    if (typeof value === "string" && /^\d+\s+\d+\s+\d+$/.test(value)) {
      result[key] = `rgb(${value} / <alpha-value>)`;
    } else {
      result[key] = value;
    }
  }
  return result;
};
