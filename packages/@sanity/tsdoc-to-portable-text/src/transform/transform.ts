import {ExtractResult} from '../extract'
import {SanityDocumentValue} from '../sanity'
import {transformPackage} from './transformPackage'
import {transformPackageMember} from './transformPackageMember'
import {TransformOpts} from './types'

/**
 * @public
 */
export function transform(
  extractResult: ExtractResult,
  opts: TransformOpts
): SanityDocumentValue[] {
  const {apiPackage} = extractResult
  const {version, scope, name} = opts.package
  const currPackageDoc = opts.currPackageDoc || null

  const releaseId = [scope, name, version]
    .filter(Boolean)
    .join('_')
    .replace(/@/g, '')
    .replace(/\./g, '-')
    .replace(/\//g, '_')

  const releaseDoc = {
    _type: 'api.release',
    _id: releaseId,
    version,
    members: [] as {
      _type: 'reference'
      _key: string
      _ref: string
      _weak: boolean
    }[],
  }

  const packageDoc = transformPackage(apiPackage, currPackageDoc, releaseDoc)

  const docs: SanityDocumentValue[] = [releaseDoc]

  for (const member of apiPackage.members[0].members) {
    const memberDoc = transformPackageMember(opts, member, releaseDoc)

    docs.push(memberDoc)

    releaseDoc.members.push({
      _type: 'reference',
      _key: memberDoc._id,
      _ref: memberDoc._id,
      _weak: true,
    })
  }

  docs.push(packageDoc)

  return docs
}
