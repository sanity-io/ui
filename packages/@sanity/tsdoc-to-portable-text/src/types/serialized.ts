import {SanityArrayItem, SanityReferenceValue} from '../_lib/sanity'
import {APIParameter, APIToken, APITypeParameter} from './common'
import {
  APICallSignature,
  APIClass,
  APIConstructor,
  APIConstructSignature,
  APIEnum,
  APIFunction,
  APIIndexSignature,
  APIInterface,
  APIMethod,
  APIMethodSignature,
  APINamespace,
  APIProperty,
  APIPropertySignature,
  APITypeAlias,
  APIVariable,
} from './members'

/**
 * @public
 */
export interface SerializedAPIEnum extends Omit<APIEnum, 'export' | 'package' | 'release'> {
  export: SanityReferenceValue
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface SerializedAPINamespace
  extends Omit<APINamespace, 'export' | 'members' | 'package' | 'release'> {
  export: SanityReferenceValue
  members: SanityArrayItem<SerializedAPIMember>[]
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface SerializedAPIParameter extends Omit<APIParameter, 'type'> {
  type: SanityArrayItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPIToken extends Omit<APIToken, 'member'> {
  member?: SanityReferenceValue
}

/**
 * @public
 */
export interface SerializedAPITypeParameter
  extends Omit<APITypeParameter, 'constraintType' | 'defaultType'> {
  constraintType?: SanityArrayItem<SerializedAPIToken>[]
  defaultType: SanityArrayItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPITypeAlias
  extends Omit<APITypeAlias, 'export' | 'package' | 'release' | 'type'> {
  export: SanityReferenceValue
  type: SanityArrayItem<SerializedAPIToken>[]
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface SerializedAPIVariable
  extends Omit<APIVariable, 'export' | 'package' | 'propsType' | 'release' | 'type'> {
  export: SanityReferenceValue
  type: SanityArrayItem<SerializedAPIToken>[]
  package: SanityReferenceValue
  propsType?: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface SerializedAPIClass
  extends Omit<APIClass, 'export' | 'members' | 'package' | 'release'> {
  export: SanityReferenceValue
  members: SanityArrayItem<SerializedAPIClassMember>[]
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface SerializedAPIFunction
  extends Omit<
    APIFunction,
    'export' | 'package' | 'parameters' | 'propsType' | 'release' | 'returnType' | 'typeParameters'
  > {
  export: SanityReferenceValue
  package: SanityReferenceValue
  parameters: SanityArrayItem<SerializedAPIParameter>[]
  propsType?: SanityReferenceValue
  release: SanityReferenceValue
  returnType: SanityArrayItem<SerializedAPIToken>[]
  typeParameters: SanityArrayItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIInterface
  extends Omit<APIInterface, 'extends' | 'members' | 'package' | 'release' | 'typeParameters'> {
  _type: 'api.interface'
  export: SanityReferenceValue
  extends: {
    _type: 'api.extend'
    type: SanityArrayItem<SerializedAPIToken>[]
  }[]
  members: SanityArrayItem<SerializedAPIInterfaceMember>[]
  package: SanityReferenceValue
  release: SanityReferenceValue
  typeParameters: SanityArrayItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface SerializedAPICallSignature
  extends Omit<APICallSignature, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayItem<SerializedAPIParameter>[]
  returnType: SanityArrayItem<SerializedAPIToken>[]
  typeParameters: SanityArrayItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIConstructSignature
  extends Omit<APIConstructSignature, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayItem<SerializedAPIParameter>[]
  returnType: SanityArrayItem<SerializedAPIToken>[]
  typeParameters: SanityArrayItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIMethodSignature
  extends Omit<APIMethodSignature, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayItem<SerializedAPIParameter>[]
  returnType: SanityArrayItem<SerializedAPIToken>[]
  typeParameters: SanityArrayItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIPropertySignature extends Omit<APIPropertySignature, 'type'> {
  type: SanityArrayItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPIIndexSignature
  extends Omit<APIIndexSignature, 'parameters' | 'returnType'> {
  parameters: SanityArrayItem<SerializedAPIParameter>[]
  returnType: SanityArrayItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export type SerializedAPIInterfaceMember =
  | SerializedAPICallSignature
  | SerializedAPIConstructSignature
  | SerializedAPIMethodSignature
  | SerializedAPIPropertySignature
  | SerializedAPIIndexSignature

/**
 * @public
 */
export interface SerializedAPIConstructor extends Omit<APIConstructor, 'parameters'> {
  parameters: SanityArrayItem<SerializedAPIParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIPropertyMember extends Omit<APIProperty, 'type'> {
  type: SanityArrayItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPIMethodMember
  extends Omit<APIMethod, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayItem<SerializedAPIParameter>[]
  returnType: SerializedAPIToken[]
  typeParameters: SanityArrayItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export type SerializedAPIClassMember =
  | SerializedAPIConstructor
  | SerializedAPIPropertyMember
  | SerializedAPIMethodMember

/**
 * All API member types.
 *
 * @public
 */
export type SerializedAPIMember =
  | SerializedAPIClass
  | SerializedAPIEnum
  | SerializedAPIFunction
  | SerializedAPIInterface
  | SerializedAPINamespace
  | SerializedAPITypeAlias
  | SerializedAPIVariable
