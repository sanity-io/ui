import {
  ApiClass,
  ApiConstructor,
  ApiItem,
  ApiMethod,
  ApiProperty,
} from '@microsoft/api-extractor-model'
import {SerializedAPIClass, SerializedAPIClassMember} from '../types'
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
export function _transformClass(ctx: TransformContext, node: ApiClass): SerializedAPIClass {
  if (!ctx.export) {
    throw new Error('transformClass: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformClass: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformClass: missing `release` document')
  }

  const docComment = node.tsdocComment
  const name = _sanitizeName(node.name)

  return {
    _type: 'api.class',
    comment: docComment ? _transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    members: node.members.map((m, idx) => ({
      _key: `member${idx}`,
      ..._transformClassMember(ctx, m),
    })),
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(name)},
  }
}

function _transformClassMember(ctx: TransformContext, m: ApiItem): SerializedAPIClassMember {
  if (m.kind === 'Constructor') {
    const mem = m as ApiConstructor
    const docComment = mem.tsdocComment

    return {
      _type: 'api.constructor',
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? _transformDocComment(docComment) : undefined,
      parameters: mem.parameters.map((p, idx) => _transformParameter(ctx, mem, p, idx)),
    }
  }

  if (m.kind === 'Method') {
    const mem = m as ApiMethod
    const docComment = mem.tsdocComment

    return {
      _type: 'api.method',
      comment: docComment ? _transformDocComment(docComment) : undefined,
      name: mem.name,
      isOptional: mem.isOptional,
      isStatic: mem.isStatic,
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

  if (m.kind === 'Property') {
    const mem = m as ApiProperty
    const docComment = mem.tsdocComment

    return {
      _type: 'api.property',
      comment: docComment ? _transformDocComment(docComment) : undefined,
      name: mem.name,
      isEventProperty: mem.isEventProperty,
      isOptional: mem.isOptional,
      isStatic: mem.isStatic,
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

  throw new Error(`Unknown class member kind: ${m.kind}`)
}
