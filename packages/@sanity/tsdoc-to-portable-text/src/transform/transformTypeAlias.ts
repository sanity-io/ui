import {ApiTypeAlias} from '@microsoft/api-extractor-model'
import {SerializedAPITypeAlias} from '../types'
import {_transformTokens} from './_transformTokens'
import {RELEASE_TAGS} from './constants'
import {_sanitizeName, _slugify} from './helpers'
import {_transformDocComment} from './transformDocComment'
import {TransformContext} from './types'

/**
 * @internal
 */
export function _transformTypeAlias(
  ctx: TransformContext,
  node: ApiTypeAlias
): SerializedAPITypeAlias {
  if (!ctx.export) {
    throw new Error('transformTypeAlias: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformTypeAlias: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformTypeAlias: missing `release` document')
  }

  const docComment = node.tsdocComment
  const name = _sanitizeName(node.name)

  return {
    _type: 'api.typeAlias',
    comment: docComment ? _transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(name)},
    type: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        node.typeExcerpt.tokenRange.startIndex,
        node.typeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
