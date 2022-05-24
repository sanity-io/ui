import {SanityArrayObjectItem, SanityReferenceValue} from '../sanity'
import {APIParameter, APIToken, APITypeParameter} from './common'
import {
  APICallSignatureMember,
  APIConstructorMember,
  APIConstructSignatureMember,
  APIFunctionMember,
  APIIndexSignatureMember,
  APIMethodMember,
  APIMethodSignatureMember,
  APIPropertyMember,
  APIPropertySignatureMember,
} from './members'
import {APITypeAlias, APIVariable} from './symbols'

/**
 * @public
 */
export interface SerializedAPIParameter extends Omit<APIParameter, 'type'> {
  type: SanityArrayObjectItem<SerializedAPIToken>[]
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
  constraintType?: SanityArrayObjectItem<SerializedAPIToken>[]
  defaultType: SanityArrayObjectItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPITypeAlias extends Omit<APITypeAlias, 'type'> {
  type: SanityArrayObjectItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPIVariable extends Omit<APIVariable, 'type'> {
  type: SanityArrayObjectItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPIFunctionMember
  extends Omit<APIFunctionMember, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayObjectItem<SerializedAPIParameter>[]
  returnType: SanityArrayObjectItem<SerializedAPIToken>[]
  typeParameters: SanityArrayObjectItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export type SerializedAPINamespaceMember = SerializedAPIFunctionMember

/**
 * @public
 */
export interface SerializedAPICallSignatureMember
  extends Omit<APICallSignatureMember, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayObjectItem<SerializedAPIParameter>[]
  returnType: SanityArrayObjectItem<SerializedAPIToken>[]
  typeParameters: SanityArrayObjectItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIConstructSignatureMember
  extends Omit<APIConstructSignatureMember, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayObjectItem<SerializedAPIParameter>[]
  returnType: SanityArrayObjectItem<SerializedAPIToken>[]
  typeParameters: SanityArrayObjectItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIMethodSignatureMember
  extends Omit<APIMethodSignatureMember, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayObjectItem<SerializedAPIParameter>[]
  returnType: SanityArrayObjectItem<SerializedAPIToken>[]
  typeParameters: SanityArrayObjectItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIPropertySignatureMember
  extends Omit<APIPropertySignatureMember, 'type'> {
  type: SanityArrayObjectItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPIIndexSignatureMember
  extends Omit<APIIndexSignatureMember, 'parameters' | 'returnType'> {
  parameters: SanityArrayObjectItem<SerializedAPIParameter>[]
  returnType: SanityArrayObjectItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export type SerializedAPIInterfaceMember =
  | SerializedAPICallSignatureMember
  | SerializedAPIConstructSignatureMember
  | SerializedAPIMethodSignatureMember
  | SerializedAPIPropertySignatureMember
  | SerializedAPIIndexSignatureMember

/**
 * @public
 */
export interface SerializedAPIConstructorMember extends Omit<APIConstructorMember, 'parameters'> {
  parameters: SanityArrayObjectItem<SerializedAPIParameter>[]
}

/**
 * @public
 */
export interface SerializedAPIPropertyMember extends Omit<APIPropertyMember, 'type'> {
  type: SanityArrayObjectItem<SerializedAPIToken>[]
}

/**
 * @public
 */
export interface SerializedAPIMethodMember
  extends Omit<APIMethodMember, 'parameters' | 'returnType' | 'typeParameters'> {
  parameters: SanityArrayObjectItem<SerializedAPIParameter>[]
  returnType: SerializedAPIToken[]
  typeParameters: SanityArrayObjectItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export type SerializedAPIClassMember =
  | SerializedAPIConstructorMember
  | SerializedAPIPropertyMember
  | SerializedAPIMethodMember
