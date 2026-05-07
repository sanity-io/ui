import {type API, type FileInfo} from 'jscodeshift'

import {addImportSpecifier} from './addImportSpecifier'
import {defineInlineTest} from './testUtils'

function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  addImportSpecifier(j, root, 'Card', 'Box')
  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'
  `,
  `
  import { Card, Box } from '@sanity/ui';
  `,
  'adds import specifier',
)

defineInlineTest(
  transform,
  {},
  `
  import {Text, Card} from '@sanity/ui'
  `,
  `
  import { Text, Card, Box } from '@sanity/ui';
  `,
  'adds import specifier to import with multiple',
)
