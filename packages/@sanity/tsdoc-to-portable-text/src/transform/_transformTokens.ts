import {ExcerptToken} from '@microsoft/api-extractor-model'
import {SanityArrayItem} from '../_lib/sanity'
import {SerializedAPIToken} from '../types'
import {_createExportMemberId} from './helpers'
import {TransformContext} from './types'

export function _transformTokens(
  ctx: TransformContext,
  tokens: ExcerptToken[]
): SanityArrayItem<SerializedAPIToken>[] {
  const pkg = ctx.package

  if (!pkg) {
    throw new Error('transformTokens: missing package document')
  }

  return tokens.map((t, idx) => {
    if (t.kind === 'Content') {
      return {
        _type: 'api.token',
        _key: `token${idx}`,
        text: t.text,
      }
    }

    if (t.kind === 'Reference') {
      if (!t.canonicalReference) {
        return {
          _type: 'api.token',
          _key: `token${idx}`,
          text: t.text,
        }
      }

      const sourceShortName = t.canonicalReference.source?.toString()
      const _sourceNameParts = sourceShortName?.split('/')
      const sourceScope = _sourceNameParts?.length === 2 ? _sourceNameParts[0] : undefined
      let sourceName = _sourceNameParts?.length === 2 ? _sourceNameParts[1] : _sourceNameParts?.[0]

      if (sourceName && sourceName.endsWith('!')) {
        sourceName = sourceName.slice(0, -1)
      }

      const refContext: TransformContext = sourceName
        ? {
            ...ctx,
            package: {...pkg, scope: sourceScope, name: sourceName},
          }
        : ctx

      return {
        _type: 'api.token',
        _key: `token${idx}`,
        text: t.text,
        symbol: {
          _type: 'reference',
          _ref: _createExportMemberId(refContext, t.canonicalReference.toString()),
        },
      }
    }

    throw new Error(`tokens: unknown type: ${t.kind}`)
  })
}
