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
import {SanityArrayObjectItem} from '../sanity'
import {
  APIInterfaceDocument,
  SerializedAPIInterfaceMember,
  SerializedAPIParameter,
  SerializedAPITypeParameter,
} from '../types'
import {_transformTokens} from './_transformTokens'
import {RELEASE_TAGS} from './constants'
import {_createExportMemberId, hash, _sanitizeName, _slugify} from './helpers'
import {transformDocComment, _transformDocCommentContent} from './transformDocComment'
import {TransformContext} from './types'

export function transformInterface(
  ctx: TransformContext,
  node: ApiInterface
): APIInterfaceDocument {
  if (!ctx.export) {
    throw new Error('transformEnum: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformEnum: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformEnum: missing `release` document')
  }

  const docComment = node.tsdocComment
  const name = _sanitizeName(node.name)

  return {
    _type: 'api.interface',
    _id: _createExportMemberId(ctx, node.canonicalReference.toString()),
    comment: docComment ? transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    extends: node.extendsTypes.map((t, idx) => {
      return {
        _type: 'api.extend',
        _key: `extend${idx}`,
        type: _transformTokens(
          ctx,
          t.excerpt.tokens.slice(t.excerpt.tokenRange.startIndex, t.excerpt.tokenRange.endIndex)
        ),
      }
    }),
    members: node.members.map((m) => _transformMember(ctx, m)),
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(name)},
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
): SanityArrayObjectItem<SerializedAPITypeParameter> {
  return {
    _type: 'api.typeParameter',
    _key: `typeParameter${idx}`,
    name: p.name,
    constraintType: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        p.constraintExcerpt.tokenRange.startIndex,
        p.constraintExcerpt.tokenRange.endIndex
      )
    ),
    defaultType: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        p.defaultTypeExcerpt.tokenRange.startIndex,
        p.defaultTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}

function _transformMember(
  ctx: TransformContext,
  m: ApiItem
): SanityArrayObjectItem<SerializedAPIInterfaceMember> {
  if (m.kind === 'CallSignature') {
    const mem = m as ApiCallSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.callSignatureMember',
      _key: hash(mem.canonicalReference.toString()),
      comment: docComment ? transformDocComment(docComment) : undefined,
      members: mem.members.map((m) => _transformMember(ctx, m)),
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      returnType: _transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
      typeParameters: mem.typeParameters.map((p, idx) => _transformTypeParameter(ctx, mem, p, idx)),
    }
  }

  if (m.kind === 'ConstructSignature') {
    const mem = m as ApiConstructSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.constructSignatureMember',
      _key: hash(mem.canonicalReference.toString()),
      comment: docComment ? transformDocComment(docComment) : undefined,
      members: mem.members.map((m) => _transformMember(ctx, m)),
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      returnType: _transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
      typeParameters: mem.typeParameters.map((p, idx) => _transformTypeParameter(ctx, mem, p, idx)),
    }
  }

  if (m.kind === 'MethodSignature') {
    const mem = m as ApiMethodSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.methodSignatureMember',
      _key: hash(mem.canonicalReference.toString()),
      comment: docComment ? transformDocComment(docComment) : undefined,
      isOptional: mem.isOptional,
      members: mem.members.map((m) => _transformMember(ctx, m)),
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
      typeParameters: mem.typeParameters.map((p, idx) => _transformTypeParameter(ctx, mem, p, idx)),
    }
  }

  if (m.kind === 'PropertySignature') {
    const mem = m as ApiPropertySignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.propertySignatureMember',
      _key: hash(mem.name),
      comment: docComment ? transformDocComment(docComment) : undefined,
      isOptional: mem.isOptional,
      name: mem.name,
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      type: _transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.propertyTypeExcerpt.tokenRange.startIndex,
          mem.propertyTypeExcerpt.tokenRange.endIndex
        )
      ),
    }
  }

  if (m.kind === 'IndexSignature') {
    const mem = m as ApiIndexSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.indexSignatureMember',
      _key: hash(mem.canonicalReference.toString()),
      comment: docComment ? transformDocComment(docComment) : undefined,
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      returnType: _transformTokens(
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

function _transformParameter(
  ctx: TransformContext,
  node: ApiIndexSignature,
  param: Parameter
): SanityArrayObjectItem<SerializedAPIParameter> {
  const tsDocComment = param.tsdocParamBlock?.content

  return {
    _type: 'api.parameter',
    _key: param.name,
    comment: tsDocComment
      ? {
          _type: 'tsdoc.docComment',
          summary: _transformDocCommentContent(tsDocComment),
        }
      : undefined,
    name: param.name,
    releaseTag: RELEASE_TAGS[node.releaseTag],
    type: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
