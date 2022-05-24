import {SanityArrayObjectItem, SanitySlugValue} from '../sanity'
import {APIParameter, APIReleaseTag, APIToken, APITypeParameter} from './common'
import {APIClassMember, APIEnumMember, APIInterfaceMember, APINamespaceMember} from './members'
import {APIPackage} from './package'
import {APIRelease} from './release'
import {TSDocComment} from './tsdoc'

/**
 * @public
 */
export interface APIClass {
  _type: 'api.class'
  comment?: TSDocComment
  members: SanityArrayObjectItem<APIClassMember>[]
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: SanitySlugValue
}

/**
 * @public
 */
export interface APIEnum {
  _type: 'api.enum'
  comment?: TSDocComment
  members: SanityArrayObjectItem<APIEnumMember>[]
  name: string
  package: APIPackage
  releaseTag?: APIReleaseTag
  slug: SanitySlugValue
}

/**
 * @public
 */
export interface APIFunction {
  _type: 'api.function'
  comment?: TSDocComment
  isReactComponentType: boolean
  name: string
  package: APIPackage
  parameters: SanityArrayObjectItem<APIParameter>[]
  propsType?: APIInterface
  release: APIRelease
  releaseTag?: APIReleaseTag
  returnType: SanityArrayObjectItem<APIToken>[]
  slug: SanitySlugValue
  typeParameters: SanityArrayObjectItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIInterface {
  _type: 'api.interface'
  comment?: TSDocComment
  extends: {_type: 'api.extend'; type: SanityArrayObjectItem<APIToken>[]}[]
  members: SanityArrayObjectItem<APIInterfaceMember>[]
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: SanitySlugValue
  typeParameters: SanityArrayObjectItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APINamespace {
  _type: 'api.namespace'
  comment?: TSDocComment
  members: SanityArrayObjectItem<APINamespaceMember>[]
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: SanitySlugValue
}

/**
 * @public
 */
export interface APITypeAlias {
  _type: 'api.typeAlias'
  comment?: TSDocComment
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: SanitySlugValue
  type: SanityArrayObjectItem<APIToken>[]
}

/**
 * @public
 */
export interface APIVariable {
  _type: 'api.variable'
  comment?: TSDocComment
  isReactComponentType: boolean
  name: string
  package: APIPackage
  propsType?: APIMember
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: SanitySlugValue
  type: SanityArrayObjectItem<APIToken>[]
}

/**
 * @public
 */
export type APIMember =
  | APIClass
  | APIEnum
  | APIFunction
  | APIInterface
  | APINamespace
  | APITypeAlias
  | APIVariable
