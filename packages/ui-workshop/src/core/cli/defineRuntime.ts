import type {WorkshopRuntime} from '../runtime/types'

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkshopRuntimeOptions extends WorkshopRuntime {}

/** @public */
export function defineRuntime(config: WorkshopRuntimeOptions): WorkshopRuntimeOptions {
  return config
}
