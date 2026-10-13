import {griffel} from '@griffel/vite-plugin'
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

/**
 * Extraction build (`dist-extract/`): the official @griffel/vite-plugin compiles
 * the app's `makeStyles()` calls ahead of time and writes their CSS to the Vite
 * stylesheet. `collectStats` prints the transform time quoted in the report.
 *
 * The two library versions still insert their precompiled CSS at runtime, so
 * this build intentionally *mixes* delivery modes. The browser test records
 * what that does to the cascade: the `<link>` precedes every runtime bucket, so
 * a library reset (`font: inherit`, bucket "r") beats an extracted app override
 * (`font-size: 14px`, bucket "d") although `mergeClasses` deduped correctly.
 * Griffel only orders buckets it controls — pick one mode per page.
 */
export default defineConfig({
  plugins: [react(), griffel({collectStats: true})],
  build: {outDir: 'dist-extract'},
})
