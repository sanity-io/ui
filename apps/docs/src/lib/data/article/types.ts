import {IconSymbol} from '@sanity/icons'
import {CardTone} from '@sanity/ui'

import {SanityArrayItemValue, SanityBlockValue, SanityImageValue} from '@/lib/sanity/types'

import {SEOData} from '../seo'

export interface CodeData {
  _type: 'code'
  code: string | null
  language: 'jsx' | null
}

export interface CodeExampleData {
  _type: 'codeExample'
  description: string | null
  caption: string | null
  title: string | null
  code: {
    _type: 'code'
    code: string
    language: string
  } | null
  hook: {
    _type: 'code'
    code: string
    language: string
  } | null
}

export interface CalloutData {
  _type: 'callout'
  content: any[] | null
  icon: IconSymbol | null
  tone: CardTone | null
}

export interface CodeExampleData {
  _type: 'codeExample'
}

export interface GroqLogoGridData {
  _type: 'content.groqLogoGrid'
}

export interface SanityLogoGridData {
  _type: 'content.sanityLogoGrid'
}

export interface SanityLogoGridData {
  _type: 'content.sanityLogoGrid'
}

export interface ColorGridData {
  _type: 'content.colorGrid'
}

export interface FigmaButtonData {
  _type: 'content.figmaButton'
  title: string | null
  url: string | null
}

export interface FigmaEmbedData {
  _type: 'content.figmaEmbed'
  url: string | null
}

export interface ImageData extends SanityImageValue {
  alt: string | null
  caption: string | null
}

export interface NpmPackageBadgeData {
  _type: 'npmPackageBadge'
  name: string | null
}

export interface PropertyData {
  name: string | null
  type: string | null
  required: boolean | null
  description: string | null
}

export interface PropertyTableData {
  _type: 'propertyTable'
  caption: string | null
  properties: PropertyData[] | null
}

export type ArticleContentData = SanityArrayItemValue<
  | SanityBlockValue
  | CodeExampleData
  | CalloutData
  | CodeData
  | CodeExampleData
  | GroqLogoGridData
  | SanityLogoGridData
  | SanityLogoGridData
  | ColorGridData
  | FigmaButtonData
  | FigmaEmbedData
  | ImageData
  | NpmPackageBadgeData
  | PropertyTableData
>[]

export interface ArticleData {
  _type: 'article'
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  content: ArticleContentData | null
  title: string | null
  figma: {url: string | null} | null
  layout: {wide: boolean | null} | null
  seo: SEOData | null
  apiMember: {
    isComponent: boolean | null
    isHook: boolean | null
  } | null
}
