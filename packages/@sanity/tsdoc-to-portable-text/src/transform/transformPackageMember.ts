import {
  ApiClass,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiTypeAlias,
  ApiVariable,
} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {transformClass} from './transformClass'
import {transformFunction} from './transformFunction'
import {transformInterface} from './transformInterface'
import {transformTypeAlias} from './transformTypeAlias'
import {transformVariable} from './transformVariable'
import {TransformOpts} from './types'

export function transformPackageMember(
  config: TransformOpts,
  member: ApiItem,
  releaseDoc: SanityDocumentValue
): SanityDocumentValue {
  if (member.kind === 'Class') {
    return transformClass(config, member as ApiClass, releaseDoc)
  }

  if (member.kind === 'Function') {
    return transformFunction(config, member as ApiFunction, releaseDoc)
  }

  if (member.kind === 'Interface') {
    return transformInterface(config, member as ApiInterface, releaseDoc)
  }

  if (member.kind === 'TypeAlias') {
    return transformTypeAlias(config, member as ApiTypeAlias, releaseDoc)
  }

  if (member.kind === 'Variable') {
    return transformVariable(config, member as ApiVariable, releaseDoc)
  }

  throw new Error(`package: unknown member type: ${member.kind}`)
}
