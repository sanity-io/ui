import {ApiEnum, ApiEnumMember, ApiItem} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, hash, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {TransformContext} from './types'

export function transformEnum(ctx: TransformContext, node: ApiEnum): SanityDocumentValue {
  if (!ctx.package) {
    throw new Error('transformEnum: missing package document')
  }

  if (!ctx.export) {
    throw new Error('transformEnum: missing export document')
  }

  const docComment = node.tsdocComment

  return {
    _type: 'api.enum',
    _id: createId(ctx, node.canonicalReference.toString()),
    package: {_type: 'reference', _ref: ctx.package._id, _weak: true},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    name: node.name,
    slug: {_type: 'slug', current: slugify(node.name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    members: node.members.map((m) => _transformEnumMember(ctx, m)),
  }
}

function _transformEnumMember(_ctx: TransformContext, m: ApiItem): Record<string, unknown> {
  if (m.kind === 'EnumMember') {
    const node = m as ApiEnumMember

    return {
      _type: 'api.enumMember',
      _key: hash(node.canonicalReference.toString()),
      releaseTag: RELEASE_TAGS[node.releaseTag],
      name: node.name,
    }
  }

  throw new Error(`Unknown enum member kind: ${m.kind}`)
}
