import {defineConfig} from '@sanity/pkg-utils'

const ReactCompilerConfig = {
  /* ... */
}

export default defineConfig({
  extract: {
    rules: {
      'ae-internal-missing-underscore': 'off',
      'ae-incompatible-release-tags': 'warn',
      'ae-missing-release-tag': 'warn',
    },
  },
  legacyExports: true,
  strictOptions: {
    // disable warning when not using browserslist in package.json
    noImplicitBrowsersList: 'off',
  },
  tsconfig: 'tsconfig.dist.json',
  babel: {
    plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
  },
})
