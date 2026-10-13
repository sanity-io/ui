import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

/**
 * Default build: everything on the page goes through the Griffel *runtime*
 * (the libraries insert their precompiled CSS, the app's own `makeStyles()` are
 * resolved at runtime), so every rule lands in the globally ordered
 * `<style data-make-styles-bucket>` elements. This is the Studio-like setup.
 *
 * See vite.extract.config.ts for the build that extracts the app's CSS with
 * @griffel/vite-plugin — and for why the two must not be mixed on one page.
 */
export default defineConfig({
  plugins: [react()],
})
