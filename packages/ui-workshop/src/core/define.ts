import {WorkshopConfig, WorkshopScope, WorkshopStory} from './types'

/** @public */
export function defineConfig(config: WorkshopConfig): WorkshopConfig {
  return config
}

/** @public */
export function defineScope(name: string, title: string, stories: WorkshopStory[]): WorkshopScope {
  return {name, title, stories}
}
