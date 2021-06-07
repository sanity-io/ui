export interface HeadingType {
  level: number
  slug: string
  text: string
}

export interface HeadingNode {
  level: number
  children: HeadingNode[]
  slug: string
  text: string
}
