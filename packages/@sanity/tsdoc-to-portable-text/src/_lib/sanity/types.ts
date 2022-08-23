/**
 * @public
 */
export interface SanityDocumentValue {
  _type: string
  _id: string
  _rev?: string
  _updatedAt?: string
  _createdAt?: string
  [key: string]: unknown
}

/**
 * @public
 */
export interface SanityReferenceValue {
  _type: 'reference'
  _ref: string
  _weak?: boolean
}

/**
 * @public
 */
export interface SanitySlugValue {
  _type: 'slug'
  current: string
}

/**
 * @public
 */
export type SanityArrayItem<T> = T & {_key: string}
