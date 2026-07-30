import {type API, type FileInfo} from 'jscodeshift'

import {defineInlineTest} from './testUtils'
import {transformImportAlias} from './transformImportAlias'

const WARNING = 'Consider renaming LegacyCard to Box'

function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  transformImportAlias(j, root, 'Card', 'Box', 'LegacyCard', WARNING)

  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  import {Card as LegacyCard} from '@sanity/ui'
  `,
  `
  // UI-POC-CODEMOD TODO: ${WARNING}
  import { Box as LegacyCard } from '@sanity/ui';
  `,
  'transforms aliased import and adds todo comment',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'
  `,
  `
  import {Card} from '@sanity/ui'
  `,
  'does not transform non-aliased import',
)
