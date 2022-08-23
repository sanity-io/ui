import {SanityArrayItem} from '../_lib/sanity'
import {APIMember} from './members'
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
  type: SanityArrayItem<APIToken>[]
}

/**
 * @public
 */
export interface APITypeParameter {
  _type: 'api.typeParameter'
  constraintType?: SanityArrayItem<APIToken>[]
  defaultType: SanityArrayItem<APIToken>[]
  name: string
}
