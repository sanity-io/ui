import {
  ApiClass,
  ApiEnum,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiNamespace,
  ApiTypeAlias,
  ApiVariable,
} from '@microsoft/api-extractor-model'
import {APIMemberDocument} from '../types'
import {transformClass} from './transformClass'
import {transformEnum} from './transformEnum'
import {transformFunction} from './transformFunction'
import {transformInterface} from './transformInterface'
import {transformNamespace} from './transformNamespace'
import {transformTypeAlias} from './transformTypeAlias'
import {transformVariable} from './transformVariable'
import {TransformContext} from './types'

export function transformExportMember(ctx: TransformContext, member: ApiItem): APIMemberDocument {
  if (member.kind === 'Class') {
    return transformClass(ctx, member as ApiClass)
  }

  if (member.kind === 'Function') {
    return transformFunction(ctx, member as ApiFunction)
  }

  if (member.kind === 'Interface') {
    return transformInterface(ctx, member as ApiInterface)
  }

  if (member.kind === 'Namespace') {
    return transformNamespace(ctx, member as ApiNamespace)
  }

  if (member.kind === 'TypeAlias') {
    return transformTypeAlias(ctx, member as ApiTypeAlias)
  }

  if (member.kind === 'Variable') {
    return transformVariable(ctx, member as ApiVariable)
  }

  if (member.kind === 'Enum') {
    return transformEnum(ctx, member as ApiEnum)
  }

  throw new Error(`package: unknown member type: ${member.kind}`)
}
