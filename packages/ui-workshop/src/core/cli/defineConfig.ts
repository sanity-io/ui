import {WorkshopConfig} from '../config/types'

/** @public */
export interface WorkshopConfigOptions extends Omit<WorkshopConfig, 'scopes'> {
  alias?: Record<string, string>
  pattern?: string | string[]
  port?: number
}

/** @public */
export function defineConfig(config: WorkshopConfigOptions): WorkshopConfigOptions {
  return config
}
