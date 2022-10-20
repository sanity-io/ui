import {WorkshopScope} from '../config'

/** @internal */
export interface MenuList {
  type: 'list'
  name?: string
  title?: string
  items: Array<MenuList | MenuScope>
}

/** @internal */
export interface MenuScope {
  type: 'scope'
  name: string
  title: string
  scope: WorkshopScope
}

/** @internal */
export interface MenuCollection {
  name?: string
  title?: string
  children?: MenuCollection[]
}
