export interface NavTreeNode {
  key: string
  disabled?: boolean
  hidden?: boolean
  path: string
  title: React.ReactNode
  children?: NavTreeNode[]
  // target?: string
  link: boolean
}
