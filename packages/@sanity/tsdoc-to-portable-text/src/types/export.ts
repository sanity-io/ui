import {SanityArrayItem} from '../_lib/sanity'
import {APIMember} from './members'
import {APIPackage} from './package'
import {APIRelease} from './release'

/**
 * @public
 */
export interface APIExport {
  _type: 'api.export'
  members: SanityArrayItem<APIMember>[]
  name: string
  package: APIPackage
  path: string
  release: APIRelease
}
