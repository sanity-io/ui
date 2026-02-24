import type {PartialTokens, Tokens} from '@sanity/ui/theme'

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
  plugins?: WorkshopPlugin[]
  scopes: WorkshopScope[]
  theme?: PartialTokens<Tokens>
  title?: string
}

/** @public */
export interface WorkshopPlugin<Options = Record<string, never>> {
  name: string
  title: string
  inspector?: React.ElementType<{options: Options}>
  provider?: React.ElementType<{children?: React.ReactNode; options: Options}>
  options?: Options
}
