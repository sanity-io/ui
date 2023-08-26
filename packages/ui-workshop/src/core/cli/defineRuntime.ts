import {WorkshopRuntime} from '../runtime'

/** @public */
export interface WorkshopRuntimeOptions extends WorkshopRuntime {}

/** @public */
export function defineRuntime(config: WorkshopRuntimeOptions): WorkshopRuntimeOptions {
  return config
}
