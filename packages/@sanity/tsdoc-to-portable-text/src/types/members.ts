import {SanityArrayItem, SanitySlugValue} from '../_lib/sanity'
import {APIParameter, APIReleaseTag, APIToken, APITypeParameter} from './common'
import {APIPackage} from './package'
import {APIRelease} from './release'
import {TSDocComment} from './tsdoc'

/**
 * @public
 */
export interface APIConstructor {
  _type: 'api.constructor'
  comment?: TSDocComment
  parameters: SanityArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
}

/**
 * @public
 */
export interface APIMethod {
  _type: 'api.method'
  comment?: TSDocComment
  isOptional: boolean
  isStatic: boolean
  name: string
  parameters: SanityArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: APIToken[]
  typeParameters: SanityArrayItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIProperty {
  _type: 'api.property'
  comment?: TSDocComment
  isEventProperty: boolean
  isOptional: boolean
  isStatic: boolean
  name: string
  releaseTag?: APIReleaseTag
  type: SanityArrayItem<APIToken>[]
}

/**
 * @public
 */
export interface APICallSignature {
  _type: 'api.callSignature'
  comment?: TSDocComment
  members: unknown[]
  parameters: SanityArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayItem<APIToken>[]
  typeParameters: SanityArrayItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIConstructSignature {
  _type: 'api.constructSignature'
  comment?: TSDocComment
  members: unknown[]
  parameters: SanityArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayItem<APIToken>[]
  typeParameters: SanityArrayItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIMethodSignature {
  _type: 'api.methodSignature'
  comment?: TSDocComment
  isOptional: boolean
  members: unknown[]
  name: string
  parameters: SanityArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayItem<APIToken>[]
  typeParameters: SanityArrayItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIPropertySignature {
  _type: 'api.propertySignature'
  comment?: TSDocComment
  isOptional: boolean
  name: string
  releaseTag?: APIReleaseTag
  type: SanityArrayItem<APIToken>[]
}

/**
 * @public
 */
export interface APIIndexSignature {
  _type: 'api.indexSignature'
  comment?: TSDocComment
  parameters: SanityArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayItem<APIToken>[]
}

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
export interface APIFunction {
  _type: 'api.function'
  comment?: TSDocComment
  name: string
  parameters: SanityArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: SanityArrayItem<APIToken>[]
  typeParameters: SanityArrayItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIIndentifier {
  _type: 'api.identifier'
  comment?: TSDocComment
  name: string
  releaseTag?: APIReleaseTag
}

/**
 * @public
 */
export interface APIClass {
  _type: 'api.class'
  comment?: TSDocComment
  members: SanityArrayItem<APIConstructor | APIProperty | APIMethod>[]
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
  members: SanityArrayItem<APIEnumMember>[]
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
  parameters: SanityArrayItem<APIParameter>[]
  propsType?: APIInterface
  release: APIRelease
  releaseTag?: APIReleaseTag
  returnType: SanityArrayItem<APIToken>[]
  slug: SanitySlugValue
  typeParameters: SanityArrayItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APIInterface {
  _type: 'api.interface'
  comment?: TSDocComment
  extends: {_type: 'api.extend'; type: SanityArrayItem<APIToken>[]}[]
  members: SanityArrayItem<
    | APICallSignature
    | APIConstructSignature
    | APIMethodSignature
    | APIPropertySignature
    | APIIndexSignature
  >[]
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: SanitySlugValue
  typeParameters: SanityArrayItem<APITypeParameter>[]
}

/**
 * @public
 */
export interface APINamespace {
  _type: 'api.namespace'
  comment?: TSDocComment
  members: SanityArrayItem<APIMember>[]
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
  type: SanityArrayItem<APIToken>[]
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
  type: SanityArrayItem<APIToken>[]
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
