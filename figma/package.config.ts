import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  dist: './dist',
  src: './src',
  tsconfig: './tsconfig.dist.json',
  strictOptions: {
    alwaysPackageJsonMain: 'off',
    alwaysPackageJsonFiles: 'off',
    noImplicitBrowsersList: 'off',
  },
})
