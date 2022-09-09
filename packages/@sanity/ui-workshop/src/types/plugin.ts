/** @public */
export interface WorkshopPlugin {
  name: string
  title: string
  inspector?: React.ElementType
  provider?: React.ElementType<{children?: React.ReactNode}>
}
