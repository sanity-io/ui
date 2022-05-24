import {SanityArrayObjectItem} from '../sanity'
import {APIPackage} from './package'
import {APIRelease} from './release'
import {APIMember} from './symbols'

/**
 * @public
 */
export interface APIExport {
  _type: 'api.export'
  members: SanityArrayObjectItem<APIMember>[]
  name: string
  package: APIPackage
  path: string
  release: APIRelease
}
