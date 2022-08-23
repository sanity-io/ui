import {SanityReferenceValue} from '../_lib/sanity'
import {APIExport} from './export'
import {APIPackage} from './package'
import {APIRelease} from './release'

/**
 * @public
 */
export interface APIPackageDocument extends Omit<APIPackage, 'latestRelease' | 'releases'> {
  _id: string
  latestRelease: SanityReferenceValue
}

/**
 * @public
 */
export interface APIReleaseDocument extends Omit<APIRelease, 'package'> {
  _id: string
  package: SanityReferenceValue
}

/**
 * @public
 */
export interface APIExportDocument
  extends Omit<APIExport, 'exports' | 'members' | 'package' | 'release'> {
  _id: string
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface APISymbolDocument {
  _id: string
  _type: 'api.symbol'
  name: string
  package: SanityReferenceValue
}
