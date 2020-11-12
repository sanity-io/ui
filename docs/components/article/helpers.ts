import slugify from 'slugify'

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
  const headings = blocks
    .filter((block) => block._type === 'block')
    .filter((block) => HEADER_RE.test(block.style))
    .map((block) => getHeadingInfo(block))

  // @todo: uniqify `slug`
  return headings
}

export function getHeadingInfo(block: any) {
  const text = blocksToText([block])

  return {
    level: Number(block.style.replace(/[^\d]/g, '')),
    text,
    slug: slugify(text).toLowerCase(),
  }
}
