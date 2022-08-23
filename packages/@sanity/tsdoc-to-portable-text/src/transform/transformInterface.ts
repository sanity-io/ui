import {
  ApiCallSignature,
  ApiConstructSignature,
  ApiIndexSignature,
  ApiInterface,
  ApiItem,
  ApiMethodSignature,
  ApiPropertySignature,
} from '@microsoft/api-extractor-model'
import {SerializedAPIInterface, SerializedAPIInterfaceMember} from '../types'
import {_transformParameter} from './_transformParameter'
import {_transformTokens} from './_transformTokens'
import {_transformTypeParameter} from './_transformTypeParameter'
import {RELEASE_TAGS} from './constants'
import {_sanitizeName, _slugify} from './helpers'
import {_transformDocComment} from './transformDocComment'
import {TransformContext} from './types'

/**
 * @internal
 */
export function _transformInterface(
  ctx: TransformContext,
  node: ApiInterface
): SerializedAPIInterface {
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
    comment: docComment ? _transformDocComment(docComment) : undefined,
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
    members: node.members.map((m, idx) => ({
      _key: `member${idx}`,
      ..._transformInterfaceMember(ctx, m),
    })),
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

function _transformInterfaceMember(
  ctx: TransformContext,
  m: ApiItem
): SerializedAPIInterfaceMember {
  if (m.kind === 'CallSignature') {
    const mem = m as ApiCallSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.callSignature',
      comment: docComment ? _transformDocComment(docComment) : undefined,
      members: mem.members.map((m) => _transformInterfaceMember(ctx, m)),
      parameters: mem.parameters.map((p, idx) => _transformParameter(ctx, mem, p, idx)),
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
      _type: 'api.constructSignature',
      comment: docComment ? _transformDocComment(docComment) : undefined,
      members: mem.members.map((m) => _transformInterfaceMember(ctx, m)),
      parameters: mem.parameters.map((p, idx) => _transformParameter(ctx, mem, p, idx)),
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
      _type: 'api.methodSignature',
      comment: docComment ? _transformDocComment(docComment) : undefined,
      isOptional: mem.isOptional,
      members: mem.members.map((m) => _transformInterfaceMember(ctx, m)),
      name: mem.name,
      parameters: mem.parameters.map((p, idx) => _transformParameter(ctx, mem, p, idx)),
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
      _type: 'api.propertySignature',
      comment: docComment ? _transformDocComment(docComment) : undefined,
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
      _type: 'api.indexSignature',
      comment: docComment ? _transformDocComment(docComment) : undefined,
      parameters: mem.parameters.map((p, idx) => _transformParameter(ctx, mem, p, idx)),
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
