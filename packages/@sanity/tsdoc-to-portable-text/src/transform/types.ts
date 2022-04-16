import {ApiPackage} from '@microsoft/api-extractor-model'
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
  apiPackage: ApiPackage
  scope?: string
  name: string
  exportPath?: string
  version: string
  package?: SanityDocumentValue
  release?: SanityDocumentValue
  export: any
}
