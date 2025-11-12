import type { StorybookConfig } from "@storybook/react-vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Ensure React runs in development mode for Storybook
    config.define = {
      ...config.define,
      "process.env.NODE_ENV": JSON.stringify("development"),
    };

    // Ensure React and React-DOM are resolved correctly
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        react: require.resolve("react"),
        "react-dom": require.resolve("react-dom"),
      },
    };

    return config;
  },
};
export default config;
