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
