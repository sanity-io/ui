import {createRequire} from 'node:module'
import path from 'node:path'

import {vanillaExtractPlugin} from '@sanity/vanilla-extract-vite-plugin'
import type {StorybookConfig} from '@storybook/react-vite'
import viteReact from '@vitejs/plugin-react'
import {mergeConfig, type Plugin} from 'vite'

const require = createRequire(import.meta.url)

// Exposes React DevTools inspection and profiling to chrome-devtools-mcp.
// Usage: `pnpm react-devtools-mcp:storybook` (see .agents/skills/react-devtools-mcp).
const isReactDevtoolsMcpEnabled = process.env.ENABLE_REACT_DEVTOOLS_MCP === 'true'

/**
 * Loads `react-devtools-cdt-mcp/register` in the preview iframe before anything else, so the
 * React DevTools hook it installs is in place when `react-dom` initializes. With that hook
 * present, `chrome-devtools-mcp` (started with `--categoryExperimentalThirdParty=true`) discovers
 * the React component tree and profiler tools from the page. Dev server only.
 */
function reactDevtoolsMcp(): Plugin {
  const registerPath = require.resolve('react-devtools-cdt-mcp/register')

  return {
    name: 'sanity-ui:react-devtools-mcp',
    apply: 'serve',
    transformIndexHtml: {
      order: 'pre',
      handler: () => [
        {
          tag: 'script',
          // Module scripts run in document order, so prepending this one to <head> evaluates
          // it before the preview entry module (and the `react-dom` it imports)
          attrs: {type: 'module', src: path.posix.join('/@fs/', registerPath)},
          injectTo: 'head-prepend',
        },
      ],
    },
  }
}

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  refs: {
    color: {
      title: '@sanity/color',
      url: 'https://color.sanity.dev',
    },
    icons: {
      title: '@sanity/icons',
      url: 'https://icons-storybook.sanity.dev',
    },
    logos: {
      title: '@sanity/logos',
      url: 'https://logos.sanity.dev',
    },
  },
  viteFinal(config) {
    return mergeConfig(config, {
      plugins: [
        // `compiler` runs the React Compiler natively via `oxc-transform-react`
        // (the Rust port) in the same pass as TypeScript/JSX — no babel
        viteReact({compiler: {target: '19'}}),
        // @sanity/ui resolves to its TypeScript source (dev `exports`), so its
        // vanilla-extract `.css.ts` modules must be compiled here
        vanillaExtractPlugin(),
        ...(isReactDevtoolsMcpEnabled ? [reactDevtoolsMcp()] : []),
      ],
    })
  },
}
export default config
