import {
  ApiFunction,
  ApiItem,
  ApiNamespace,
  Parameter,
  TypeParameter,
} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, hash, slugify} from './helpers'
import {transformDocComment, _transformDocCommentContent} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {TransformContext} from './types'

export function transformNamespace(ctx: TransformContext, node: ApiNamespace): SanityDocumentValue {
  if (!ctx.package) {
    throw new Error('transformNamespace: missing package document')
  }

  if (!ctx.export) {
    throw new Error('transformNamespace: missing export document')
  }

  if (!ctx.package) {
    throw new Error('transformNamespace: missing package document')
  }

  const docComment = node.tsdocComment

  return {
    _type: 'api.namespace',
    _id: createId(ctx, node.canonicalReference.toString()),
    package: {_type: 'reference', _ref: ctx.package._id, _weak: true},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    name: node.name,
    slug: {_type: 'slug', current: slugify(node.name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    members: node.members.map((m) => _transformNamespaceMember(ctx, m)),
  }
}

function _transformNamespaceMember(ctx: TransformContext, m: ApiItem): Record<string, unknown> {
  if (m.kind === 'Function') {
    const mem = m as ApiFunction
    const docComment = mem.tsdocComment

    return {
      _type: 'api.functionMember',
      _key: hash(mem.canonicalReference.toString()),
      name: mem.name,
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
      members: mem.members.map((m) => _transformFunctionMember(ctx, m)),
      typeParameters: mem.typeParameters.map((p) => _transformTypeParameter(ctx, mem, p)),
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      returnType: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
    }
  }

  throw new Error(`Unknown namespace member kind: ${m.kind}`)
}

function _transformTypeParameter(
  ctx: TransformContext,
  method: ApiFunction,
  typeParam: TypeParameter
) {
  return {
    _type: 'api.typeParameter',
    _key: typeParam.name,
    name: typeParam.name,
    defaultType: transformTokens(
      ctx,
      method.excerptTokens.slice(
        typeParam.defaultTypeExcerpt.tokenRange.startIndex,
        typeParam.defaultTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}

function _transformParameter(ctx: TransformContext, node: ApiFunction, param: Parameter) {
  const tsDocComment = param.tsdocParamBlock?.content

  return {
    _type: 'api.parameter',
    _key: hash(param.name),
    name: param.name,
    comment: tsDocComment ? _transformDocCommentContent(tsDocComment) : undefined,
    type: transformTokens(
      ctx,
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}

function _transformFunctionMember(_ctx: TransformContext, m: ApiItem): Record<string, unknown> {
  // @todo
  throw new Error(`Unknown function member kind: ${m.kind}`)
}
