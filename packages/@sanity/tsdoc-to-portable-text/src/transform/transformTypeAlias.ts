import {ApiTypeAlias} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {TransformOpts} from './types'

export function transformTypeAlias(
  config: TransformOpts,
  node: ApiTypeAlias,
  releaseDoc: SanityDocumentValue
): SanityDocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)

  return {
    _type: 'api.typeAlias',
    _id: createId(config, node.canonicalReference.toString()),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    type: transformTokens(
      config,
      node.excerptTokens.slice(
        node.typeExcerpt.tokenRange.startIndex,
        node.typeExcerpt.tokenRange.endIndex
      )
    ),
    releaseTag: RELEASE_TAGS[node.releaseTag],
  }
}
