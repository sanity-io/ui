import {SanityDocumentValue} from '../sanity'

/**
 * @public
 */
export interface TransformOpts {
  package: {
    version: string
  }
  currPackageDoc?: SanityDocumentValue | null
}

/**
 * @public
 */
export interface TransformContext {
  package: {
    scope: string | null
    name: string
    version: string
  }
  currPackageDoc: SanityDocumentValue | null
  packageDoc?: SanityDocumentValue
  releaseDoc: SanityDocumentValue
}
