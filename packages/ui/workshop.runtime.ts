import {defineRuntime} from '@sanity/ui-workshop'

export default defineRuntime({
  vite: (viteConfig) => ({
    ...viteConfig,
    optimizeDeps: {
      ...viteConfig.optimizeDeps,
      // Keep the self-referenced `@sanity/ui` (which the dev `exports`
      // resolve to TypeScript source) out of the dependency prebundle, so the
      // workshop shell (imported from node_modules) and the stories share the
      // single copy served from `exports/` — otherwise React contexts are
      // duplicated and stories never finish loading.
      exclude: [...(viteConfig.optimizeDeps?.exclude ?? []), '@sanity/ui'],
    },
  }),
})
