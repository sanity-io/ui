export interface WorkshopPlugin {
  name: string
  title: string
  inspector?: React.ComponentType
  provider?: React.ComponentType<{children?: React.ReactNode}>
}
