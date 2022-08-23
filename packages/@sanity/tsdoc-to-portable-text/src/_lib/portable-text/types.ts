import {SanityArrayItem} from '../sanity'

/**
 * @public
 */
export interface PortableTextSpanNode {
  _type: 'span'
  _markDef?: {
    _key?: string
    _type: 'link'
    href: string
  }
  marks?: string[]
  text: string
}

/**
 * @public
 */
export interface PortableTextCodeNode {
  _type: 'code'
  code: string
  language: string
}

/**
 * @public
 */
export interface PortableTextBlockNode {
  _type: 'block'
  style: string
  children: SanityArrayItem<PortableTextNode>[]
  markDefs: SanityArrayItem<PortableTextSpanNode['_markDef']>[]
}

/**
 * @public
 */
export type PortableTextNode = PortableTextSpanNode | PortableTextCodeNode | PortableTextBlockNode
