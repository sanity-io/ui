import {ApiPackage} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {isArray, isRecord} from './helpers'

export function transformPackage(
  node: ApiPackage,
  currPackageDoc: SanityDocumentValue | null,
  releaseDoc: SanityDocumentValue
): SanityDocumentValue {
  const _releases = currPackageDoc?.releases

  let releases = isArray(_releases) ? _releases : []

  const release = releases.find((r) => isRecord(r) && r._key === releaseDoc._id)

  if (release) {
    // replace
    releases = releases.map((r) => {
      if (r === release) {
        return {
          _type: 'reference',
          _key: releaseDoc._id,
          _ref: releaseDoc._id,
          _weak: true,
        }
      }

      return r
    })
  } else {
    // add
    releases.push({
      _type: 'reference',
      _key: releaseDoc._id,
      _ref: releaseDoc._id,
      _weak: true,
    })
  }

  return {
    ...currPackageDoc,
    _type: 'api.package',
    _id: node.name.replace(/@/g, '').replace(/\./g, '-').replace(/\//g, '_'),
    name: node.name,
    releases,
    latestRelease: {
      _type: 'reference',
      _ref: releaseDoc._id,
      _weak: true,
    },
  }
}
