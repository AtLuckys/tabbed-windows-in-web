import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rsbuild/core';

export default defineConfig({
  plugins: [pluginReact({ fastRefresh: true })],
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  html: {
    template: './index.html',
  },
  output: {
    assetPrefix: process.env.NODE_ENV === 'production' ? '/tabbed-windows-in-web/' : '/',
  },
});
