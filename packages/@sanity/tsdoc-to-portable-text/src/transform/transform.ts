import {ExtractResult} from '../extract'
import {SanityDocumentValue} from '../sanity'
import {isArray, _parsePackageName} from './helpers'
import {transformPackage} from './transformPackage'
import {transformPackageMember} from './transformPackageMember'
import {TransformContext, TransformOpts} from './types'

/**
 * @public
 */
export function transform(
  extractResults: ExtractResult[],
  opts: TransformOpts
): SanityDocumentValue[] {
  const {version: releaseVersion} = opts.package

  const state: any = {
    package: opts.currPackageDoc || undefined,
    identifiers: [],
    members: [],
  }

  for (const extractResult of extractResults) {
    const {apiPackage, exportPath} = extractResult
    const [packageScope, packageName] = _parsePackageName(apiPackage.name)

    const releaseId = [packageScope, packageName, releaseVersion]
      .filter(Boolean)
      .join('_')
      .replace(/@/g, '')
      .replace(/\./g, '-')
      .replace(/\//g, '_')

    const exportDoc: any = {
      _key: exportPath || '.',
      _type: 'api.export',
      name: [packageScope, packageName, exportPath].filter(Boolean).join('/'),
      path: exportPath || '.',
      members: [],
    }

    const ctx: TransformContext = {
      apiPackage: apiPackage,
      scope: packageScope,
      name: packageName,
      exportPath,
      version: releaseVersion,
      package: state.package,
      release: state.release,
      export: exportDoc,
    }

    const packageDoc = transformPackage(ctx, apiPackage)

    ctx.package = packageDoc

    ctx.release = {
      ...ctx.release,
      _type: 'api.release',
      _id: releaseId,
      package: {
        _type: 'reference',
        _ref: ctx.package._id,
        _weak: true,
      },
      version: releaseVersion,
      exports: ctx.release?.exports || [],
    }

    ctx.package.latestRelease = {
      _type: 'reference',
      _ref: ctx.release._id,
      _weak: true,
    }

    let releases: any[] = isArray(ctx.package.releases) ? ctx.package.releases : []

    const isReleased = releases.some((r) => r._ref === releaseId)

    // replace or append
    ctx.package.releases = releases = isReleased
      ? releases.map((r) => {
          if (r._key === releaseId) {
            return {
              _type: 'reference',
              _key: releaseId,
              _ref: releaseId,
              _weak: true,
            }
          }

          return r
        })
      : releases.concat([
          {
            _type: 'reference',
            _key: releaseId,
            _ref: releaseId,
            _weak: true,
          },
        ])

    if (isArray(ctx.release.exports)) {
      ctx.release.exports.push(exportDoc)
    }

    for (const member of apiPackage.members[0].members) {
      const memberDoc = transformPackageMember(ctx, member)

      state.members.push(memberDoc)

      const identifierDoc = {
        _type: 'api.identifier',
        _id: packageDoc._id + `_${member.displayName}`,
        name: member.displayName,
        package: {
          _type: 'reference',
          _ref: packageDoc._id,
        },
      }

      if (
        isArray(ctx.package?.identifiers) &&
        !ctx.package?.identifiers.includes(identifierDoc.name)
      ) {
        ctx.package.identifiers.push(identifierDoc.name)
        ctx.package.identifiers.sort()
      }

      if (isArray(ctx.export.identifiers)) {
        ctx.export.identifiers.push({
          _type: 'reference',
          _key: identifierDoc._id,
          _ref: identifierDoc._id,
          _weak: true,
        })
      }

      if (isArray(ctx.export.members)) {
        ctx.export.members.push({
          _type: 'reference',
          _key: memberDoc._id,
          _ref: memberDoc._id,
          _weak: true,
        })
      }

      state.members.push(identifierDoc)
    }

    // keep these references
    state.package = ctx.package
    state.release = ctx.release
  }

  const docs: SanityDocumentValue[] = [state.package, state.release, ...state.members]

  return docs
}
