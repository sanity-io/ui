import {ApiPackage} from '@microsoft/api-extractor-model'
import {APIExportDocument, APIPackageDocument, APIReleaseDocument} from '../types'

/**
 * @public
 */
export interface TransformOpts {
  package: {
    version: string
  }
  currPackageDoc?: APIPackageDocument
}

/**
 * @public
 */
export interface TransformContext {
  apiPackage: ApiPackage
  scope?: string
  name: string
  version: string
  package?: APIPackageDocument
  release?: APIReleaseDocument
  export: APIExportDocument
}
