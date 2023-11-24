import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  babel: {
    plugins: ['@babel/plugin-transform-object-rest-spread'],
  },
  dist: './dist',
  src: './src',
  tsconfig: './tsconfig.dist.json',
})
