import {ApiClass} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {TransformOpts} from './types'

export function transformClass(
  config: TransformOpts,
  node: ApiClass,
  releaseDoc: SanityDocumentValue
): SanityDocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)

  return {
    _type: 'api.class',
    _id: createId(config, node.canonicalReference.toString()),
    release: {_type: 'reference', _ref: releaseDoc._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    releaseTag: RELEASE_TAGS[node.releaseTag],
  }
}
