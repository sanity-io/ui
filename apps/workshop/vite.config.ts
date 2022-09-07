import path from 'path'
import viteReact from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import {ScopeResolverOptions} from './scripts/scopes/_helpers'
import {designWorkshop} from './vite/plugin-design-workshop'
import {pluginWorkshopScopes} from './vite/plugin-workshop-scopes'

const ROOT_PATH = path.join(__dirname, '../..')

const WORKSHOP_SCOPES_OPTIONS: ScopeResolverOptions = {
  pattern: [
    path.resolve(ROOT_PATH, 'packages/**/src/**/__workshop__/index.ts'),
    path.resolve(ROOT_PATH, 'packages/**/src/**/__workshop__/index.tsx'),
  ],
  target: path.resolve(__dirname, 'src/scopes.js'),
}

export default defineConfig({
  build: {
    sourcemap: true,
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        frame: path.resolve(__dirname, 'src/frame/index.html'),
      },
    },
  },
  define: {
    // @todo: only in development?
    'process.env.ROOT_PATH': JSON.stringify(ROOT_PATH),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [viteReact(), pluginWorkshopScopes(WORKSHOP_SCOPES_OPTIONS), designWorkshop()],
  resolve: {
    alias: [
      {
        find: '@sanity/color',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/color/src'),
      },
      {
        find: '@sanity/logos',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/logos/src'),
      },
      {
        find: '@sanity/icons',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/icons/src'),
      },
      {
        find: '@sanity/ui',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/ui/src'),
      },
      {
        find: '@sanity/ui-workshop',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/ui-workshop/src'),
      },
      {
        find: 'react/jsx-dev-runtime',
        replacement: require.resolve('react/jsx-dev-runtime'),
      },
      {
        find: 'react/jsx-runtime',
        replacement: require.resolve('react/jsx-runtime'),
      },
      {
        find: 'react',
        replacement: require.resolve('react'),
      },
      {
        find: 'react-dom/client',
        replacement: require.resolve('react-dom/client'),
      },
      {
        find: 'react-dom',
        replacement: require.resolve('react-dom'),
      },
      {
        find: 'styled-components',
        replacement: require.resolve('styled-components'),
      },
    ],
  },
  root: path.resolve(__dirname, 'src'),
  server: {
    host: true,
    port: 9009,
  },
})
