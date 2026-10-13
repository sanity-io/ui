import {griffelTsdownPlugin} from '@css-eval/tsdown-plugin-griffel'
import {defineConfig} from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'browser',
  dts: true,
  // Worst case on purpose: v2 carries its *own* copy of the Griffel runtime, so
  // the page ends up with two renderers, two insertion caches and two sets of
  // <style data-make-styles-bucket> elements. Only `react` stays shared.
  noExternal: [/^@griffel\//],
  plugins: [griffelTsdownPlugin({mode: 'inject', fileName: 'styles.css'})],
})
