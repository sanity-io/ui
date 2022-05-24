import {ApiFunction, ApiItem, ApiNamespace, Parameter} from '@microsoft/api-extractor-model'
import {SanityArrayObjectItem} from '../sanity'
import {APINamespaceDocument, SerializedAPINamespaceMember, SerializedAPIParameter} from '../types'
import {_transformTokens} from './_transformTokens'
import {_transformTypeParameter} from './_transformTypeParameter'
import {RELEASE_TAGS} from './constants'
import {_createExportMemberId, hash, _slugify} from './helpers'
import {transformDocComment, _transformDocCommentContent} from './transformDocComment'
import {TransformContext} from './types'

export function transformNamespace(
  ctx: TransformContext,
  node: ApiNamespace
): APINamespaceDocument {
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
    _id: _createExportMemberId(ctx, node.canonicalReference.toString()),
    comment: docComment ? transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    members: node.members.map((m) => _transformNamespaceMember(ctx, m)),
    name: node.name,
    package: {_type: 'reference', _ref: ctx.package._id},
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(node.name)},
  }
}

function _transformNamespaceMember(
  ctx: TransformContext,
  m: ApiItem
): SanityArrayObjectItem<SerializedAPINamespaceMember> {
  if (m.kind === 'Function') {
    const mem = m as ApiFunction
    const docComment = mem.tsdocComment

    return {
      _type: 'api.functionMember',
      _key: hash(mem.canonicalReference.toString()),
      comment: docComment ? transformDocComment(docComment) : undefined,
      // members: mem.members.map((m) => _transformFunctionMember(ctx, m)),
      name: mem.name,
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      returnType: _transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
      typeParameters: mem.typeParameters.map((p) => _transformTypeParameter(ctx, mem, p)),
    }
  }

  throw new Error(`Unknown namespace member kind: ${m.kind}`)
}

function _transformParameter(
  ctx: TransformContext,
  node: ApiFunction,
  param: Parameter
): SanityArrayObjectItem<SerializedAPIParameter> {
  const tsDocComment = param.tsdocParamBlock?.content

  return {
    _type: 'api.parameter',
    _key: hash(param.name),
    comment: tsDocComment
      ? {
          _type: 'tsdoc.docComment',
          summary: _transformDocCommentContent(tsDocComment),
        }
      : undefined,
    name: param.name,
    type: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
