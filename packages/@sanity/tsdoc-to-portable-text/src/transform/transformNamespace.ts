import {ApiItem, ApiNamespace} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
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

function _transformNamespaceMember(_ctx: TransformContext, m: ApiItem): Record<string, unknown> {
  throw new Error(`Unknown namespace member kind: ${m.kind}`)
}
