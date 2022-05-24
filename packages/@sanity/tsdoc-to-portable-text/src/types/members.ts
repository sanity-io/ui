import {SanityArrayObjectItem} from '../sanity'
import {APIParameter, APIReleaseTag, APIToken, APITypeParameter} from './common'
import {TSDocComment} from './tsdoc'

/**
 * @public
 */
export interface APIConstructorMember {
  _type: 'api.constructorMember'
  comment?: TSDocComment
  parameters: SanityArrayObjectItem<APIParameter>[]
  releaseTag?: APIReleaseTag
}

/**
 * @public
 */
export interface APIMethodMember {
  _type: 'api.methodMember'
  comment?: TSDocComment
  isOptional: boolean
  isStatic: boolean
  name: string
  parameters: SanityArrayObjectItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: APIToken[]
  typeParameters: SanityArrayObjectItem<APITypeParameter>[]
}

/**
 * @public
 */
export type APIClassMember = APIConstructorMember | APIPropertyMember | APIMethodMember

/**
 * @public
 */
export interface APIPropertyMember {
  _type: 'api.propertyMember'
  comment?: TSDocComment
  isEventProperty: boolean
  isOptional: boolean
  isStatic: boolean
  name: string
  releaseTag?: APIReleaseTag
  type: SanityArrayObjectItem<APIToken>[]
}

/**
 * @public
 */
export interface APICallSignatureMember {
  _type: 'api.callSignatureMember'
  comment?: TSDocComment
  members: unknown[]
  parameters: SanityArrayObjectItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayObjectItem<APIToken>[]
  typeParameters: SanityArrayObjectItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIConstructSignatureMember {
  _type: 'api.constructSignatureMember'
  comment?: TSDocComment
  members: unknown[]
  parameters: SanityArrayObjectItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayObjectItem<APIToken>[]
  typeParameters: SanityArrayObjectItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIMethodSignatureMember {
  _type: 'api.methodSignatureMember'
  comment?: TSDocComment
  isOptional: boolean
  members: unknown[]
  name: string
  parameters: SanityArrayObjectItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayObjectItem<APIToken>[]
  typeParameters: SanityArrayObjectItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIPropertySignatureMember {
  _type: 'api.propertySignatureMember'
  comment?: TSDocComment
  isOptional: boolean
  name: string
  releaseTag?: APIReleaseTag
  type: SanityArrayObjectItem<APIToken>[]
}

/**
 * @public
 */
export interface APIIndexSignatureMember {
  _type: 'api.indexSignatureMember'
  comment?: TSDocComment
  parameters: SanityArrayObjectItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayObjectItem<APIToken>[]
}

/**
 * @public
 */
export type APIInterfaceMember =
  | APICallSignatureMember
  | APIConstructSignatureMember
  | APIMethodSignatureMember
  | APIPropertySignatureMember
  | APIIndexSignatureMember

/**
 * @public
 */
export interface APIEnumMember {
  _type: 'api.enumMember'
  name: string
  releaseTag?: APIReleaseTag
}

/**
 * @public
 */
export interface APIFunctionMember {
  _type: 'api.functionMember'
  comment?: TSDocComment
  name: string
  parameters: SanityArrayObjectItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayObjectItem<APIToken>[]
  typeParameters: SanityArrayObjectItem<APITypeParameter>[]
}

/**
 * @public
 */
export type APINamespaceMember = APIFunctionMember
