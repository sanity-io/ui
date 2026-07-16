import {PortableTextObject} from 'sanity'

interface SanitySpanValue {
  _type: 'span'
  text: string
}

export interface SanityBlockValue {
  _type: 'block'
  children: SanitySpanValue[]
  level?: number
  listItem?: 'bullet' | 'number'
  markDefs: PortableTextObject[]
  style: string
}
