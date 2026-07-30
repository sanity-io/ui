import {defineConfig} from '@sanity/tsdown-config'

export default await defineConfig({
  entry: {
    'index': './exports/index.ts',
    'theme': './exports/theme.ts',
  },
  tsconfig: 'tsconfig.dist.json',
  styledComponents: true,
  reactCompiler: {target: '19'},
})
