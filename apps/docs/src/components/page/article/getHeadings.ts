import slugify from '@sindresorhus/slugify'

import {blocksToText} from '@/lib/blocksToText'
import {ArticleData} from '@/lib/data'
import {SanityBlockValue} from '@/lib/sanity/types'

export interface HeadingType {
  level: number
  slug: string
  text: string
}

const HEADER_RE = /^h\d/

function isBlock(record: {_type: string}): record is SanityBlockValue {
  return record._type === 'block'
}

export function getHeadings(article: ArticleData['content']): HeadingType[] {
  const blocks = (article || []).filter(isBlock) as unknown as SanityBlockValue[]

  // todo: uniqify `slug`
  return blocks
    .filter((block) => block.style && HEADER_RE.test(block.style))
    .map((block) => getHeadingInfo(block))
}

function getHeadingInfo(block: SanityBlockValue): HeadingType {
  const text = blocksToText([block])

  return {
    level: block.style ? Number(block.style.replace(/[^\d]/g, '')) : 0,
    text,
    slug: slugify(text).toLowerCase(),
  }
}
