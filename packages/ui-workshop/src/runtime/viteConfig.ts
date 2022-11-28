import path from 'path'
import react from '@vitejs/plugin-react'
import {UserConfig} from 'vite'
import {WorkshopConfigOptions} from '../core/cli'

/** @internal */
export function createViteConfig(options: {
  config?: WorkshopConfigOptions
  cwd: string
  outDir: string
}): UserConfig {
  const {config, cwd, outDir} = options

  return {
    build: {
      outDir: path.resolve(cwd, 'dist'),
      rollupOptions: {
        input: {
          main: path.resolve(outDir, 'index.html'),
          frame: path.resolve(outDir, 'frame/index.html'),
        },
      },
    },
    plugins: [react()],
    resolve: {alias: config?.alias},
    root: path.resolve(cwd, '.workshop'),
  }
}
