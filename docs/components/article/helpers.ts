import slugify from 'slugify'
import {HeadingNode} from './types'

const HEADER_RE = /^h\d/

const blocksToText_defaults = {nonTextBehavior: 'remove'}

export function blocksToText(blocks: any[], opts: any = {}) {
  const options = Object.assign({}, blocksToText_defaults, opts)

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map((child: any) => child.text).join('')
    })
    .join('\n\n')
}

export function getTOC(blocks: any[]) {
  // @todo: uniqify `slug`
  const headings = blocks
    .filter((block) => block._type === 'block')
    .filter((block) => HEADER_RE.test(block.style))
    .map((block) => getHeadingInfo(block))

  const root: HeadingNode = {
    level: 1,
    children: [],
    slug: 'root',
    text: '<root>',
  }

  let node: HeadingNode = root

  const stack: HeadingNode[] = [node]

  for (const heading of headings) {
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
        node = stack[stack.length - 1]
      }

      const parent = stack[stack.length - 1]

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

export function getHeadingInfo(block: any) {
  const text = blocksToText([block])

  return {
    level: Number(block.style.replace(/[^\d]/g, '')),
    text,
    slug: slugify(text).toLowerCase(),
  }
}
