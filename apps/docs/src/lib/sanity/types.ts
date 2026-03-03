export interface SanityImageValue {
  _type: 'image'
  asset: SanityReferenceValue | null
  crop: SanityImageCropValue | null
  hotspot: SanityImageHotspotValue | null
}

export interface SanityReferenceValue {
  _type: 'reference'
  _ref: string
}

export interface SanityImageCropValue {
  _type: 'sanity.imageCrop'
  top: number
  left: number
  bottom: number
  right: number
}

export interface SanityImageHotspotValue {
  _type: 'sanity.imageHotspot'
  width: number
  x: number
  y: number
  height: number
}

export interface SanitySpanValue {
  _type: 'span'
  text: string
}

export interface SanityBlockValue {
  _type: 'block'
  children: SanitySpanValue[]
  level?: number
  listItem?: 'bullet' | 'number'
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  markDefs: {}[]
  style: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SanityArrayItemValue<T extends {}> = T & {
  _key: string
}
