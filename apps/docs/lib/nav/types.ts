import {BadgeTone} from '@sanity/ui'

export interface NavItem {
  collapsed: boolean
  hidden: boolean
  href?: string
  title?: string
  menuTitle?: string
  items: NavItem[]
  segment?: string
}

export interface NavMenuLink {
  type: 'menuLink'
  hidden: boolean
  href: string
  title?: string
  badge?: {
    text: string
    tone?: BadgeTone
  }
}

export interface NavMenu {
  type: 'menu'
  collapsed: boolean
  items: NavMenuItem[]
  title?: string
}

export type NavMenuItem = NavMenu | NavMenuLink
