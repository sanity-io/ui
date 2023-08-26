import {InlineConfig} from 'vite'

/** @public */
export interface WorkshopRuntime {
  build?: {
    outDir?: string
  }
  pattern?: string | string[]
  server?: {
    port?: number
  }
  vite?: (viteConfig: InlineConfig) => InlineConfig
}
