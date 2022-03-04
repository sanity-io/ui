import {WorkshopScope} from '../types'

export interface MenuList {
  type: 'list'
  name?: string
  title?: string
  items: Array<MenuList | MenuScope>
}

export interface MenuScope {
  type: 'scope'
  name: string
  title: string
  scope: WorkshopScope
}

export interface MenuCollection {
  name?: string
  title?: string
  children?: MenuCollection[]
}
