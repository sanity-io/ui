import {WorkshopConfig} from '../config'

/** @public */
export interface WorkshopConfigOptions extends Omit<WorkshopConfig, 'scopes'> {}

/** @public */
export function defineConfig(config: WorkshopConfigOptions): WorkshopConfigOptions {
  return config
}
