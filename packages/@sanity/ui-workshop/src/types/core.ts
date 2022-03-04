export interface WorkshopCollection {
  name: string
  title: string
}

export interface WorkshopStory<Options = Record<string, unknown>> {
  name: string
  title: string
  component: React.ComponentType
  options?: Options
}

export interface WorkshopScope {
  name: string
  title: string
  stories: WorkshopStory[]
}
