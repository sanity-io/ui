// Client-component boundary for Next.js App Router / RSC. Rolldown preserves
// this directive on the published entry chunks. Keep it off `@sanity/ui/theme`
// (pure tokens) and shared `_chunks/*`.
'use client'

export * from '../src/core'
