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
  name: string
  title: string
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
  title?: string
}

/** @public */
export interface WorkshopPlugin {
  name: string
  title: string
  inspector?: React.ElementType
  provider?: React.ElementType<{children?: React.ReactNode}>
}
