export type BlockType = {
  id: number;
  type: "text" | "image";
  html?: string;
  src?: string;
};

/**
 * HTML 문자열을 블록 배열로 파싱
 */
export const parseContentToBlocks = (html: string): BlockType[] => {
  if (!html.trim()) {
    return [{ id: Date.now(), type: "text", html: "" }];
  }

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const blocks: BlockType[] = [];
  let blockId = Date.now();

  // 모든 자식 요소를 순회
  Array.from(tempDiv.childNodes).forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.tagName === "P") {
        blocks.push({
          id: blockId++,
          type: "text",
          html: el.innerHTML || "",
        });
      } else if (el.tagName === "IMG") {
        blocks.push({
          id: blockId++,
          type: "image",
          src: el.getAttribute("src") || "",
        });
      } else if (el.tagName === "BR") {
        // <br>은 무시하거나 마지막 블록에 추가
        if (blocks.length > 0 && blocks[blocks.length - 1].type === "text") {
          blocks[blocks.length - 1].html += "<br>";
        }
      } else {
        // 기타 요소는 텍스트 블록으로 변환
        blocks.push({
          id: blockId++,
          type: "text",
          html: el.outerHTML || "",
        });
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        blocks.push({
          id: blockId++,
          type: "text",
          html: text,
        });
      }
    }
  });

  return blocks.length > 0
    ? blocks
    : [{ id: Date.now(), type: "text", html: "" }];
};

/**
 * 블록 배열을 HTML 문자열로 변환
 */
export const blocksToHtml = (blocks: BlockType[]): string => {
  return blocks
    .map((block) => {
      if (block.type === "text") {
        return `<p>${block.html || ""}</p>`;
      } else if (block.type === "image" && block.src) {
        return `<img src="${block.src}" style="max-width: 100%; height: auto; display: block; margin: 16px 0;" />`;
      }
      return "";
    })
    .join("");
};
