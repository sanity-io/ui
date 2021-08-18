import {SanityDocument} from '@sanity/types'
import {isRecord} from '../lib/helpers'

const BASE_URL = 'http://localhost:3000/api/preview'

export default function resolveProductionUrl(doc: SanityDocument) {
  if (doc._type === 'article') {
    const slug = isRecord(doc.slug) && doc.slug?.current

    if (slug === 'intro') {
      return `${BASE_URL}?slug=/`
    }

    return `${BASE_URL}?slug=/${slug}`
  }

  return null
}
