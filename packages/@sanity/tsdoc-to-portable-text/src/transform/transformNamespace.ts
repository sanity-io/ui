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
import {SerializedAPIMember, SerializedAPINamespace} from '../types'
import {RELEASE_TAGS} from './constants'
import {_slugify} from './helpers'
import {_transformClass} from './transformClass'
import {_transformDocComment} from './transformDocComment'
import {_transformEnum} from './transformEnum'
import {_transformFunction} from './transformFunction'
import {_transformInterface} from './transformInterface'
import {_transformTypeAlias} from './transformTypeAlias'
import {_transformVariable} from './transformVariable'
import {TransformContext} from './types'

/**
 * @internal
 */
export function _transformNamespace(
  ctx: TransformContext,
  node: ApiNamespace
): SerializedAPINamespace {
  if (!ctx.export) {
    throw new Error('transformNamespace: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformNamespace: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformNamespace: missing `release` document')
  }

  const docComment = node.tsdocComment

  return {
    _type: 'api.namespace',
    comment: docComment ? _transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    members: node.members.map((m, idx) => ({
      _key: `member${idx}`,
      ..._transformNamespaceMember(ctx, m),
    })),
    name: node.name,
    package: {_type: 'reference', _ref: ctx.package._id},
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(node.name)},
  }
}

function _transformNamespaceMember(ctx: TransformContext, m: ApiItem): SerializedAPIMember {
  if (m.kind === 'Class') {
    return _transformClass(ctx, m as ApiClass)
  }

  if (m.kind === 'Enum') {
    return _transformEnum(ctx, m as ApiEnum)
  }

  if (m.kind === 'Function') {
    return _transformFunction(ctx, m as ApiFunction)
  }

  if (m.kind === 'Interface') {
    return _transformInterface(ctx, m as ApiInterface)
  }

  if (m.kind === 'Namespace') {
    return _transformNamespace(ctx, m as ApiNamespace)
  }

  if (m.kind === 'TypeAlias') {
    return _transformTypeAlias(ctx, m as ApiTypeAlias)
  }

  if (m.kind === 'Variable') {
    return _transformVariable(ctx, m as ApiVariable)
  }

  throw new Error(`Unknown namespace  kind: ${m.kind}`)
}
