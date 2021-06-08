import {ApiPackage} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {isArray, isRecord} from './helpers'
import {TransformContext} from './types'

export function transformPackage(ctx: TransformContext, node: ApiPackage): SanityDocumentValue {
  let releases =
    ctx.currPackageDoc && isArray(ctx.currPackageDoc.releases) ? ctx.currPackageDoc.releases : []

  const release = releases.find((r) => isRecord(r) && r._key === ctx.releaseDoc._id)

  if (release) {
    // replace
    releases = releases.map((r) => {
      if (isRecord(r) && isRecord(release) && r._key === release._key) {
        return {
          _type: 'reference',
          _key: ctx.releaseDoc._id,
          _ref: ctx.releaseDoc._id,
          _weak: true,
        }
      }

      return r
    })
  } else {
    // add
    releases.push({
      _type: 'reference',
      _key: ctx.releaseDoc._id,
      _ref: ctx.releaseDoc._id,
      _weak: true,
    })
  }

  return {
    ...(ctx.currPackageDoc || {}),
    _type: 'api.package',
    _id: node.name.replace(/@/g, '').replace(/\./g, '-').replace(/\//g, '_'),
    scope: ctx.package.scope,
    name: ctx.package.name,
    releases,
    latestRelease: {
      _type: 'reference',
      _ref: ctx.releaseDoc._id,
      _weak: true,
    },
  }
}
