import {APIRelease} from './release'

/**
 * @public
 */
export interface APIPackage {
  _type: 'api.package'
  scope?: string
  name: string
  latestRelease: APIRelease
}
