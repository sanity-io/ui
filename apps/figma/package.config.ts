import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  babel: {
    plugins: [
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-transform-class-properties',
      '@babel/plugin-transform-logical-assignment-operators',
      '@babel/plugin-transform-nullish-coalescing-operator',
      '@babel/plugin-transform-object-rest-spread',
      '@babel/plugin-transform-optional-catch-binding',
      '@babel/plugin-transform-optional-chaining',
    ],
  },
  minify: true,
  tsconfig: 'tsconfig.dist.json',
})
