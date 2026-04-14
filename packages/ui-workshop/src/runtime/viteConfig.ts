import react from '@vitejs/plugin-react'
import path from 'path'
import type {UserConfig} from 'vite'

/** @internal */
export function createViteConfig(options: {
  cwd: string
  mode: 'development' | 'production'
  outDir: string
  runtimeDir: string
}): UserConfig {
  const {cwd, mode, outDir, runtimeDir} = options

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
    cacheDir: path.resolve(cwd, 'node_modules/.workshop/vite'),
    mode,
    optimizeDeps: {
      esbuildOptions: {
        jsx: 'automatic',
      },
    },
    plugins: [react()],
    root: cwd,
  }
}
