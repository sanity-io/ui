const BASE_URL = 'http://localhost:3000/api/preview'

export default function resolveProductionUrl(doc) {
  if (doc._type === 'article') {
    const slug = doc.slug?.current

    if (slug === 'intro') {
      return `${BASE_URL}?slug=/`
    }

    return `${BASE_URL}?slug=/${slug}`
  }

  return null
}
