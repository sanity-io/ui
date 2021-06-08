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
import {TransformContext} from './types'

export function transformPackageMember(
  ctx: TransformContext,
  member: ApiItem
): SanityDocumentValue {
  if (member.kind === 'Class') {
    return transformClass(ctx, member as ApiClass)
  }

  if (member.kind === 'Function') {
    return transformFunction(ctx, member as ApiFunction)
  }

  if (member.kind === 'Interface') {
    return transformInterface(ctx, member as ApiInterface)
  }

  if (member.kind === 'TypeAlias') {
    return transformTypeAlias(ctx, member as ApiTypeAlias)
  }

  if (member.kind === 'Variable') {
    return transformVariable(ctx, member as ApiVariable)
  }

  throw new Error(`package: unknown member type: ${member.kind}`)
}
