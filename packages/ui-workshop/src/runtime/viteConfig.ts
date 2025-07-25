import react from '@vitejs/plugin-react'
import path from 'path'
import {UserConfig} from 'vite'

/** @internal */
export function createViteConfig(options: {
  cwd: string
  outDir: string
  runtimeDir: string
}): UserConfig {
  const {cwd, outDir, runtimeDir} = options

  return {
    build: {
      outDir,
      rollupOptions: {
        input: {
          main: path.resolve(runtimeDir, 'index.html'),
          frame: path.resolve(runtimeDir, 'frame/index.html'),
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        jsx: 'automatic',
      },
    },
    plugins: [
      react({
        babel: {plugins: [['babel-plugin-react-compiler', {target: '19'}]]},
      }),
    ],
    root: cwd,
  }
}
