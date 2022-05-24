import {SanityArrayObjectItem} from '../sanity'
import {APIExport} from './export'
import {APIPackage} from './package'

/**
 * @public
 */
export interface APIRelease {
  _type: 'api.release'
  package: APIPackage
  exports: SanityArrayObjectItem<APIExport>[]
  version: string
}
