import slugify from 'slugify'
import {HeadingType, HeadingNode} from './types'
import {isArray, isRecord, isString} from '$lib/types'

const HEADER_RE = /^h\d/

const blocksToText_defaults = {nonTextBehavior: 'remove'}

export function blocksToText(
  blocks: Record<string, unknown>[],
  opts: {nonTextBehavior?: 'remove'} = {}
) {
  const options = Object.assign({}, blocksToText_defaults, opts)

  return blocks
    .map((block) => {
      if ((isRecord(block) && block._type !== 'block') || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return (
        (isArray(block.children) &&
          block.children.map((child) => (isRecord(child) ? child.text : ''))) ||
        []
      ).join('')
    })
    .join('\n\n')
}

export function getHeadings(val: unknown): HeadingType[] {
  const blocks = isArray(val) ? val : []

  // @todo: uniqify `slug`
  return blocks
    .filter((block) => isRecord(block) && block._type === 'block')
    .filter((block) => isRecord(block) && isString(block.style) && HEADER_RE.test(block.style))
    .map((block) => getHeadingInfo(isRecord(block) ? block : {}))
}

export function getTOCTree(headings: HeadingType[]) {
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

export function getHeadingInfo(block: Record<string, unknown>): HeadingType {
  const text = blocksToText([block])

  return {
    level: isString(block.style) ? Number(block.style.replace(/[^\d]/g, '')) : 0,
    text,
    slug: slugify(text).toLowerCase(),
  }
}
