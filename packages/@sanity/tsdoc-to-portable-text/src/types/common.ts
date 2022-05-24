import {SanityArrayObjectItem} from '../sanity'
import {APIMember} from './symbols'
import {TSDocComment} from './tsdoc'

/**
 * @public
 */
export type APIReleaseTag = 'internal' | 'alpha' | 'beta' | 'public'

/**
 * @public
 */
export interface APIToken {
  _type: 'api.token'
  member?: APIMember & {_id: string}
  text: string
}

/**
 * @public
 */
export interface APIParameter {
  _type: 'api.parameter'
  comment?: TSDocComment
  name: string
  releaseTag?: APIReleaseTag
  type: SanityArrayObjectItem<APIToken>[]
}

/**
 * @public
 */
export interface APITypeParameter {
  _type: 'api.typeParameter'
  constraintType?: SanityArrayObjectItem<APIToken>[]
  defaultType: SanityArrayObjectItem<APIToken>[]
  name: string
}
