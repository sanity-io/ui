import {WorkshopConfig} from '../config'

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkshopConfigOptions extends Omit<WorkshopConfig, 'scopes'> {}

/** @public */
export function defineConfig(config: WorkshopConfigOptions): WorkshopConfigOptions {
  return config
}
