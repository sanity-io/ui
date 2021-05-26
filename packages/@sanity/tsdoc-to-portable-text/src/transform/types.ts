import {SanityDocumentValue} from '../sanity'

/**
 * @public
 */
export interface TransformOpts {
  package: {
    scope: string | null
    name: string
    version: string
  }
  currPackageDoc?: SanityDocumentValue | null
}
