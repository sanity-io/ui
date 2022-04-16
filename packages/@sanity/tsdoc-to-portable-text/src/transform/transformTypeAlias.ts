import {ApiTypeAlias} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {TransformContext} from './types'

export function transformTypeAlias(ctx: TransformContext, node: ApiTypeAlias): SanityDocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)

  if (!ctx.package) {
    throw new Error('transformTypeAlias: missing package document')
  }

  if (!ctx.export) {
    throw new Error('transformTypeAlias: missing export document')
  }

  return {
    _type: 'api.typeAlias',
    _id: createId(ctx, node.canonicalReference.toString()),
    package: {_type: 'reference', _ref: ctx.package._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    type: transformTokens(
      ctx,
      node.excerptTokens.slice(
        node.typeExcerpt.tokenRange.startIndex,
        node.typeExcerpt.tokenRange.endIndex
      )
    ),
    releaseTag: RELEASE_TAGS[node.releaseTag],
  }
}
