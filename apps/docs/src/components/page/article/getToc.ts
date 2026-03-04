import {HeadingType} from './getHeadings'

export interface HeadingNode {
  level: number
  children: HeadingNode[]
  slug: string
  text: string
}

export function getTOCTree(headings: HeadingType[]): HeadingNode[] {
  const root: HeadingNode = {
    level: 1,
    children: [],
    slug: 'root',
    text: '<root>',
  }

  let node: HeadingNode = root

  const stack: HeadingNode[] = [node]

  for (const heading of headings) {
    if (!node) {
      break
    }

    if (heading.level > node.level) {
      const parent = node

      node = {
        level: heading.level,
        children: [],
        slug: heading.slug,
        text: heading.text,
      }

      parent.children.push(node)
      stack.push(node)
    } else {
      while (heading.level <= node.level) {
        stack.pop()

        const nextNode = stack[stack.length - 1] as HeadingNode | undefined

        if (!nextNode) {
          break
        }

        node = nextNode
      }

      const nextParent = stack[stack.length - 1] as HeadingNode | undefined

      if (!nextParent) {
        break
      }

      const parent = nextParent

      node = {
        level: heading.level,
        children: [],
        slug: heading.slug,
        text: heading.text,
      }

      stack.push(node)

      parent.children.push(node)
    }
  }

  return root.children
}
