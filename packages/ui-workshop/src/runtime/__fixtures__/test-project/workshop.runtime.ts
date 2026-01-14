import {defineRuntime} from '@sanity/ui-workshop/runtime'

export default defineRuntime({
  pattern: ['src/**/*.workshop.tsx'],
  server: {
    port: 13337, // Use non-standard port for testing (modified)
  },
})
