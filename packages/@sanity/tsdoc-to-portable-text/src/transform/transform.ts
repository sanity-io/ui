import {ExtractResult} from '../extract'
import {SanityDocumentValue} from '../sanity'
import {transformPackage} from './transformPackage'
import {transformPackageMember} from './transformPackageMember'
import {TransformContext, TransformOpts} from './types'

/**
 * @public
 */
export function transform(
  extractResult: ExtractResult,
  opts: TransformOpts
): SanityDocumentValue[] {
  const {apiPackage} = extractResult
  const {version} = opts.package
  const currPackageDoc = opts.currPackageDoc || null
  const p = apiPackage.name.split('/')
  const packageScope = p.length > 1 ? p[0] : null
  const packageName = p.length > 1 ? p[1] : p[0]

  const releaseId = [apiPackage.name, version]
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

  const ctx: TransformContext = {
    package: {
      scope: packageScope,
      name: packageName,
      version,
    },
    currPackageDoc,
    releaseDoc,
  }

  const packageDoc = transformPackage(ctx, apiPackage)

  const docs: SanityDocumentValue[] = [releaseDoc]

  for (const member of apiPackage.members[0].members) {
    const memberDoc = transformPackageMember(ctx, member)

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
