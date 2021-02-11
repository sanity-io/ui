export interface StudioCommand {
  name: string
  shortcut?: string[]
  title: string
  handle: () => void
}
