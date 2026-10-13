import {griffelTsdownPlugin} from '@css-eval/tsdown-plugin-griffel'
import {defineConfig} from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'browser',
  dts: true,
  // `@griffel/react` is a regular dependency, so tsdown externalizes it: v1
  // shares the single Griffel runtime that the consuming app installs.
  plugins: [
    griffelTsdownPlugin({
      // The Fluent UI publishing model: class names and CSS are computed at build
      // time, the runtime inserts the CSS. `dist/styles.css` is emitted too, but
      // only so the CSS footprint can be measured — the runtime never reads it.
      mode: 'inject',
      fileName: 'styles.css',
    }),
  ],
})
