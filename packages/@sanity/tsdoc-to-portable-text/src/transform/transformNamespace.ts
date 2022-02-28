import {ApiNamespace} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {createId} from './helpers'
import {TransformContext} from './types'

export function transformNamespace(ctx: TransformContext, node: ApiNamespace): SanityDocumentValue {
  if (!ctx.packageDoc) {
    throw new Error('transformNamespace: missing package document')
  }

  // @todo
  return {
    _type: 'api.namespace',
    _id: createId(ctx, node.canonicalReference.toString()),
    package: {_type: 'reference', _ref: ctx.packageDoc._id, _weak: true},
    release: {_type: 'reference', _ref: ctx.releaseDoc._id, _weak: true},
    name: node.displayName,
  }
}
