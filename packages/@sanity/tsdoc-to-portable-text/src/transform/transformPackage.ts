import {ApiPackage} from '@microsoft/api-extractor-model'
import {SanityReferenceValue} from '../sanity'
import {APIPackageDocument} from '../types'
import {TransformContext} from './types'

export function transformPackage(ctx: TransformContext, node: ApiPackage): APIPackageDocument {
  const _id = node.name.replace(/@/g, '').replace(/\./g, '-').replace(/\//g, '_')

  return {
    _type: 'api.package',
    _id,
    latestRelease: ctx.package?.latestRelease as SanityReferenceValue,
    name: ctx.name,
    scope: ctx.scope,
  }
}
