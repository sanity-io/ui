import type {InlineConfig} from 'vite'

/** @public */
export interface WorkshopRuntime {
  build?: {
    outDir?: string
  }
  pattern?: string | string[]
  server?: {
    port?: number
  }
  vite?: (viteConfig: InlineConfig) => InlineConfig | Promise<InlineConfig>
}

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkshopRuntimeOptions extends WorkshopRuntime {}
