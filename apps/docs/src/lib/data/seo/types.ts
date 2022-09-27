import {SanityImageValue} from '@/lib/sanity/types'

export interface SEOData {
  _type: 'seo'
  title: string | null
  description: string | null
  og: {
    image: SanityImageValue | null
    title: string | null
    description: string | null
    type: 'website' | null
  } | null
  twitter: {
    cardType: 'summary_large_image' | 'summary' | null
  } | null
}
