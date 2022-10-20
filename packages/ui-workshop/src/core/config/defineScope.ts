import {WorkshopScope, WorkshopStory} from './types'

/** @public */
export function defineScope(name: string, title: string, stories: WorkshopStory[]): WorkshopScope {
  return {name, title, stories}
}
