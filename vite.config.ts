/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  // GitHub Pages 배포를 위한 base path 설정
  base: process.env.GITHUB_PAGES === "true" ? "/nextworld-fe/" : "/",
  plugins: [
    react({
      babel: {
        plugins:
          // @locator 플러그인은 Windows 경로에서 이슈가 있어 일시적으로 비활성화
          process.platform !== "win32"
            ? [
                [
                  "@locator/babel-jsx/dist",
                  {
                    env: "development",
                  },
                ],
              ]
            : [],
        parserOpts: {
          errorRecovery: true,
        },
        generatorOpts: {
          compact: false,
          retainLines: false,
        },
      },
    }),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
      svgrOptions: {
        ref: true,
        expandProps: "end",
        replaceAttrValues: {
          strokecolor: "{props.strokecolor}",
          bgcolor: "{props.bgcolor}",
          fillcolor: "{props.fillcolor}",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    minify: true,
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // CSS 변수 형식 관련 경고 무시
        if (warning.code === "CSS_SYNTAX_ERROR") {
          return;
        }
        warn(warning);
      },
    },
  },
  esbuild: {
    logOverride: {
      "css-syntax-error": "silent",
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
