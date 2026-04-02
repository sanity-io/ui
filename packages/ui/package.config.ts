import {defineConfig} from '@sanity/pkg-utils'

// https://github.com/sanity-io/pkg-utils#configuration
export default defineConfig({
  // the path to the tsconfig file for distributed builds
  tsconfig: 'tsconfig.dist.json',
})
