import type {WorkshopScope} from '../config/types'

export interface MenuStory<Options = Record<string, unknown>> {
  type: 'story'
  name: string
  title: string
  component: React.ElementType
  options?: Options
}

/** @internal */
export interface MenuList {
  type: 'list'
  name?: string
  title?: string
  items: Array<MenuList | MenuScope | MenuStory>
}

/** @internal */
export interface MenuScope {
  type: 'scope'
  name: string
  title: string
  scope: WorkshopScope
}
