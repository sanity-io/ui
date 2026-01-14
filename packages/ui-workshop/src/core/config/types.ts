/* eslint-disable @typescript-eslint/no-explicit-any */
import type {RootTheme} from '@sanity/ui'

/** @public */
export interface WorkshopCollection {
  name: string
  title: string
}

/** @public */
export interface WorkshopStory<Options = Record<string, unknown>> {
  name: string
  title: string
  component: React.ElementType
  options?: Options
}

/** @public */
export interface WorkshopScope {
  name?: string
  title?: string
  stories: WorkshopStory[]
}

/** @public */
export interface WorkshopConfig {
  collections?: WorkshopCollection[]
  features?: {
    navbar?: boolean
  }
  frameUrl?: string
  plugins?: WorkshopPlugin<any>[]
  scopes: WorkshopScope[]
  theme?: RootTheme
  title?: string
}

/** @public */
export interface WorkshopPlugin<Options = any> {
  name: string
  title: string
  inspector?: React.ElementType<{options: Options}>
  provider?: React.ElementType<{children?: React.ReactNode; options: Options}>
  options?: Options
}
