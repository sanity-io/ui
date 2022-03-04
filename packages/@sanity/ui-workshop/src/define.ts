import {WorkshopConfig, WorkshopScope, WorkshopStory} from './types'

export function defineConfig(config: WorkshopConfig): WorkshopConfig {
  return config
}

export function defineScope(name: string, title: string, stories: WorkshopStory[]): WorkshopScope {
  return {name, title, stories}
}
