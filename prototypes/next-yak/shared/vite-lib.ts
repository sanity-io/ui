import react from '@vitejs/plugin-react'
import {viteYak} from 'next-yak/vite'
import type {UserConfig} from 'vite'

import {yakPrefixFor} from './yak-prefix.ts'

export interface LibBuildOptions {
  /** package.json `name` */
  name: string
  /** package.json `version` */
  version: string
}

/**
 * Library build shared by `@yak-eval/ui-v1` and `@yak-eval/ui-v2`.
 *
 * - `vite build` in library mode on Vite 8 (rolldown), React externalized, `next-yak/internal`
 *   externalized: the runtime is a regular `dependencies` entry of the published package, like
 *   `styled-components` is for `@sanity/ui` today.
 * - Default build (`dist/`): `prefix` derived from `name@version` (see `yak-prefix.ts`).
 * - `YAK_UNSAFE=1` (`dist-unsafe/`): next-yak's out-of-the-box naming, used only to reproduce the
 *   vanilla-extract 4.4.3→4.4.4 class collision on the `unsafe.html` page of the app.
 */
export function createLibConfig({name, version}: LibBuildOptions): UserConfig {
  const unsafe = process.env.YAK_UNSAFE === '1'
  return {
    plugins: [
      viteYak({
        // Production naming (`y<hash><n>`) regardless of NODE_ENV so the published artifact is
        // what consumers would get; dev naming only adds the variable name, not the content.
        minify: true,
        displayNames: false,
        ...(unsafe ? {} : {prefix: yakPrefixFor(name, version)}),
      }),
      react(),
    ],
    build: {
      outDir: unsafe ? 'dist-unsafe' : 'dist',
      emptyOutDir: true,
      // Readable output so the CSS of v1 and v2 can be diffed; sizes are measured gzipped anyway.
      minify: false,
      lib: {
        entry: 'src/index.ts',
        formats: ['es'],
        fileName: 'index',
        cssFileName: 'styles',
      },
      rolldownOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', /^next-yak(\/|$)/],
      },
    },
  }
}
