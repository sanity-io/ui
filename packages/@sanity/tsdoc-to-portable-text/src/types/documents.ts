import {SanityArrayObjectItem, SanityReferenceValue} from '../sanity'
import {APIExport} from './export'
import {APIPackage} from './package'
import {APIRelease} from './release'
import {
  SerializedAPIClassMember,
  SerializedAPIInterfaceMember,
  SerializedAPINamespaceMember,
  SerializedAPIParameter,
  SerializedAPIToken,
  SerializedAPITypeAlias,
  SerializedAPITypeParameter,
  SerializedAPIVariable,
} from './serialized'
import {APIClass, APIEnum, APIFunction, APIInterface, APINamespace} from './symbols'

/**
 * @public
 */
export interface APIClassDocument extends Omit<APIClass, 'members' | 'package' | 'release'> {
  _id: string
  export: SanityReferenceValue
  members: SanityArrayObjectItem<SerializedAPIClassMember>[]
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface APIEnumDocument extends Omit<APIEnum, 'package' | 'release'> {
  _id: string
  export: SanityReferenceValue
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface APIFunctionDocument
  extends Omit<
    APIFunction,
    'parameters' | 'package' | 'propsType' | 'release' | 'returnType' | 'typeParameters'
  > {
  _id: string
  export: SanityReferenceValue
  package: SanityReferenceValue
  parameters: SanityArrayObjectItem<SerializedAPIParameter>[]
  propsType?: SanityReferenceValue
  release: SanityReferenceValue
  returnType: SanityArrayObjectItem<SerializedAPIToken>[]
  typeParameters: SanityArrayObjectItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface APIInterfaceDocument
  extends Omit<APIInterface, 'extends' | 'members' | 'package' | 'release' | 'typeParameters'> {
  _id: string
  export: SanityReferenceValue
  extends: {
    _type: 'api.extend'
    type: SanityArrayObjectItem<SerializedAPIToken>[]
  }[]
  members: SanityArrayObjectItem<SerializedAPIInterfaceMember>[]
  package: SanityReferenceValue
  release: SanityReferenceValue
  typeParameters: SanityArrayObjectItem<SerializedAPITypeParameter>[]
}

/**
 * @public
 */
export interface APINamespaceDocument
  extends Omit<APINamespace, 'members' | 'package' | 'release'> {
  _id: string
  export: SanityReferenceValue
  members: SerializedAPINamespaceMember[]
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface APITypeAliasDocument extends Omit<SerializedAPITypeAlias, 'package' | 'release'> {
  _id: string
  export: SanityReferenceValue
  package: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export interface APIVariableDocument
  extends Omit<SerializedAPIVariable, 'package' | 'propsType' | 'release'> {
  _id: string
  export: SanityReferenceValue
  package: SanityReferenceValue
  propsType?: SanityReferenceValue
  release: SanityReferenceValue
}

/**
 * @public
 */
export type APIMemberDocument =
  | APIClassDocument
  | APIEnumDocument
  | APIFunctionDocument
  | APIInterfaceDocument
  | APINamespaceDocument
  | APITypeAliasDocument
  | APIVariableDocument

/**
 * @public
 */
export interface APIPackageDocument extends Omit<APIPackage, 'latestRelease' | 'releases'> {
  _id: string
  latestRelease: SanityReferenceValue
}

export interface APIReleaseDocument extends Omit<APIRelease, 'exports' | 'package'> {
  _id: string
  package: SanityReferenceValue
}

export interface APIExportDocument
  extends Omit<APIExport, 'exports' | 'members' | 'package' | 'release'> {
  _id: string
  package: SanityReferenceValue
  release: SanityReferenceValue
}

export interface APISymbolDocument {
  _id: string
  _type: 'api.symbol'
  name: string
  package: SanityReferenceValue
}
