import {APIPackage} from './package'

/**
 * @public
 */
export interface APIRelease {
  _type: 'api.release'
  package: APIPackage
  version: string
}
