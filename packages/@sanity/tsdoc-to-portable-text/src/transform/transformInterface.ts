import {
  ApiCallSignature,
  ApiConstructSignature,
  ApiIndexSignature,
  ApiInterface,
  ApiItem,
  ApiMethodSignature,
  ApiPropertySignature,
  Parameter,
  TypeParameter,
} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, hash, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {TransformContext} from './types'

export function transformInterface(ctx: TransformContext, node: ApiInterface): SanityDocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)

  if (!ctx.packageDoc) {
    throw new Error('transformInterface: missing package document')
  }

  return {
    _type: 'api.interface',
    _id: createId(ctx, node.canonicalReference.toString()),
    package: {_type: 'reference', _ref: ctx.packageDoc._id, _weak: true},
    release: {_type: 'reference', _ref: ctx.releaseDoc._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    extends: node.extendsTypes.map((t, idx) => {
      return {
        _type: 'api.extend',
        _key: `extend${idx}`,
        type: transformTokens(
          ctx,
          t.excerpt.tokens.slice(t.excerpt.tokenRange.startIndex, t.excerpt.tokenRange.endIndex)
        ),
      }
    }),
    members: node.members.map((m) => _transformMember(ctx, m)),
    releaseTag: RELEASE_TAGS[node.releaseTag],
    typeParameters: node.typeParameters.map((p, idx: number) => {
      return _transformTypeParameter(ctx, node, p, idx)
    }),
  }
}

function _transformTypeParameter(
  ctx: TransformContext,
  node: ApiCallSignature | ApiInterface,
  p: TypeParameter,
  idx: number
) {
  return {
    _type: 'api.typeParameter',
    _key: `typeParameter${idx}`,
    name: p.name,
    constraintType: transformTokens(
      ctx,
      node.excerptTokens.slice(
        p.constraintExcerpt.tokenRange.startIndex,
        p.constraintExcerpt.tokenRange.endIndex
      )
    ),
    defaultTypeType: transformTokens(
      ctx,
      node.excerptTokens.slice(
        p.defaultTypeExcerpt.tokenRange.startIndex,
        p.defaultTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}

function _transformMember(ctx: TransformContext, m: ApiItem): Record<string, unknown> {
  if (m.kind === 'CallSignature') {
    const mem = m as ApiCallSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.callSignature',
      _key: hash(mem.canonicalReference.toString()),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
      members: mem.members.map((m) => _transformMember(ctx, m)),
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      typeParameters: mem.typeParameters.map((p, idx) => _transformTypeParameter(ctx, mem, p, idx)),
      returnType: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
    }
  }

  if (m.kind === 'ConstructSignature') {
    const mem = m as ApiConstructSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.constructSignature',
      _key: hash(mem.canonicalReference.toString()),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
      members: mem.members.map((m) => _transformMember(ctx, m)),
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      typeParameters: mem.typeParameters.map((p, idx) => _transformTypeParameter(ctx, mem, p, idx)),
      returnType: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
    }
  }

  if (m.kind === 'MethodSignature') {
    const mem = m as ApiMethodSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.methodSignature',
      _key: hash(mem.canonicalReference.toString()),
      name: mem.name,
      isOptional: mem.isOptional,
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
      members: mem.members.map((m) => _transformMember(ctx, m)),
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      typeParameters: mem.typeParameters.map((p, idx) => _transformTypeParameter(ctx, mem, p, idx)),
      returnType: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
    }
  }

  if (m.kind === 'PropertySignature') {
    const mem = m as ApiPropertySignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.property',
      _key: hash(mem.name),
      type: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.propertyTypeExcerpt.tokenRange.startIndex,
          mem.propertyTypeExcerpt.tokenRange.endIndex
        )
      ),
      name: mem.name,
      comment: docComment ? transformDocComment(docComment) : undefined,
      isOptional: mem.isOptional,
      releaseTag: RELEASE_TAGS[mem.releaseTag],
    }
  }

  if (m.kind === 'IndexSignature') {
    const mem = m as ApiIndexSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.indexProperty',
      _key: hash(mem.canonicalReference.toString()),
      members: mem.members.map((m) => _transformMember(ctx, m)),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
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

  throw new Error(`Unknown interface member kind: ${m.kind}`)
}

function _transformParameter(ctx: TransformContext, node: ApiIndexSignature, param: Parameter) {
  return {
    _type: 'api.parameter',
    _key: param.name,
    name: param.name,
    releaseTag: RELEASE_TAGS[node.releaseTag],
    type: transformTokens(
      ctx,
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
