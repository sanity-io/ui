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
