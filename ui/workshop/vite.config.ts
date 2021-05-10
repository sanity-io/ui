import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import {defineConfig} from 'vite'
import {resolveWorkshopEnvPlugin} from './resolveStoriesPlugin'

const ROOT_PATH = path.join(__dirname, '../..')

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        frame: path.resolve(__dirname, 'frame/index.html'),
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [reactRefresh(), resolveWorkshopEnvPlugin()],
  resolve: {
    alias: [
      {
        find: '@sanity/color',
        replacement: path.resolve(ROOT_PATH, 'color/src'),
      },
      {
        find: '@sanity/logos',
        replacement: path.resolve(ROOT_PATH, 'logos/src'),
      },
      {
        find: '@sanity/icons',
        replacement: path.resolve(ROOT_PATH, 'icons/src'),
      },
      {
        find: '@sanity/ui',
        replacement: path.resolve(ROOT_PATH, 'ui/src'),
      },
      {
        find: '@sanity/ui-workshop',
        replacement: path.resolve(ROOT_PATH, 'tools/ui-workshop/src'),
      },
      {
        find: 'react',
        replacement: require.resolve('react'),
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
  root: __dirname,
  server: {
    port: 9009,
  },
})
