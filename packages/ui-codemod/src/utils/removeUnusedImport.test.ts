import {type API, type FileInfo} from 'jscodeshift'

import {removeUnusedImport} from './removeUnusedImport'
import {defineInlineTest} from './testUtils'

function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  removeUnusedImport(j, root, 'Card')
  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  <Card density="regular" />
  `,
  `
  import {Card} from '@sanity/ui'

  <Card density="regular" />
  `,
  'preserves import if element is in jsx',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'
  import {Box} from '@sanity/ui'

  <Box />
  `,
  `
  import {Box} from '@sanity/ui'

  <Box />
  `,
  'removes import if element is not in jsx',
)

defineInlineTest(
  transform,
  {},
  `
  import {Box, Card} from '@sanity/ui'

  <Box />
  `,
  `
  import { Box } from '@sanity/ui';

  <Box />
  `,
  'updates import with multiple specifiers if element is not in jsx',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  const RootCard = styled(Card)(({theme}) => {})
  `,
  `
  import {Card} from '@sanity/ui'

  const RootCard = styled(Card)(({theme}) => {})
  `,
  'preserves import when component is used with styled()',
)
