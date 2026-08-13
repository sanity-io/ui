import {SanityBlockValue} from '@/lib/sanity/types'

import {isArray} from './common/isArray'
import {isRecord} from './common/isRecord'

const blocksToText_defaults = {nonTextBehavior: 'remove'}

export function blocksToText(
  blocks: SanityBlockValue[],
  opts: {nonTextBehavior?: 'remove'} = {},
): string {
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
