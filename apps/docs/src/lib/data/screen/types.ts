import {SanityImageValue} from '@/lib/sanity/types'

import {SEOData} from '../seo'

export interface HeroSectionData {
  _key: string
  _type: 'screenSection.hero'
  headline: string | null
  copy: string | null
  linksHeader: string | null
  links:
    | {
        _key: string
        _type: 'link'
        href: string | null
        title: string | null
        subtitle: string | null
      }[]
    | null
  ctas:
    | {
        _key: string
        _type: 'cta'
        heading: string | null
        mode: 'default' | null
        tone: 'primary' | null
        href: string | null
        label: string | null
      }[]
    | null
  backgroundImage: {
    light: SanityImageValue | null
    dark: SanityImageValue | null
  } | null
}

export interface ScreenData {
  _type: 'screen'
  _createdAt: string
  _updatedAt: string
  _rev: string
  _id: string
  title: string | null
  sections: HeroSectionData[] | null
  seo: SEOData | null
}
