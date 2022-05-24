import {ApiEnum, ApiEnumMember, ApiItem} from '@microsoft/api-extractor-model'
import {SanityArrayObjectItem} from '../sanity'
import {APIEnumDocument, APIEnumMember} from '../types'
import {RELEASE_TAGS} from './constants'
import {_createExportMemberId, hash, _slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {TransformContext} from './types'

export function transformEnum(ctx: TransformContext, node: ApiEnum): APIEnumDocument {
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

  return {
    _type: 'api.enum',
    _id: _createExportMemberId(ctx, node.canonicalReference.toString()),
    comment: docComment ? transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    members: node.members.map((m) => _transformEnumMember(ctx, m)),
    name: node.name,
    package: {_type: 'reference', _ref: ctx.package._id},
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(node.name)},
  }
}

function _transformEnumMember(
  _ctx: TransformContext,
  m: ApiItem
): SanityArrayObjectItem<APIEnumMember> {
  if (m.kind === 'EnumMember') {
    const node = m as ApiEnumMember

    return {
      _type: 'api.enumMember',
      _key: hash(node.canonicalReference.toString()),
      name: node.name,
      releaseTag: RELEASE_TAGS[node.releaseTag],
    }
  }

  throw new Error(`Unknown enum member kind: ${m.kind}`)
}
