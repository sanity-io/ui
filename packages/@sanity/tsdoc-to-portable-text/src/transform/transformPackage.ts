import {ApiPackage} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {TransformContext} from './types'

export function transformPackage(ctx: TransformContext, node: ApiPackage): SanityDocumentValue {
  const _id = node.name.replace(/@/g, '').replace(/\./g, '-').replace(/\//g, '_')

  return {
    ...ctx.package,
    _type: 'api.package',
    _id,
    scope: ctx.scope,
    name: ctx.name,
    releases: ctx.package?.releases || [],
    identifiers: ctx.package?.identifiers || [],
  }
}
