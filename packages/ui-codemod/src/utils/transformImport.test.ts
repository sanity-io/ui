import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../types/BaseOptions'
import {defineInlineTest} from '../utils/testUtils'
import {transformImport} from './transformImport'

function transform(fileInfo: FileInfo, api: API, options: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  transformImport(j, root, 'Box', options.fromPackage, options.toPackage)
  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  import {Box} from '@sanity/ui'

  <Box />
  `,
  `
  import {Box} from '@sanity/ui'

  <Box />
  `,
  'does not update import path if fromPackage and toPackage are not set',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui'},
  `
  import {Box} from '@legacy/ui'

  <Box />
  `,
  `
  import {Box} from "@sanity/ui"

  <Box />
  `,
  'updates import path if only fromPackage is set',
)

defineInlineTest(
  transform,
  {toPackage: '@latest/ui'},
  `
  import {Box} from '@sanity/ui'

  <Box />
  `,
  `
  import {Box} from "@latest/ui"

  <Box />
  `,
  'updates import path if only toPackage is set',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@legacy/ui'},
  `
  import {Box} from '@legacy/ui'

  <Box />
  `,
  `
  import {Box} from '@legacy/ui'

  <Box />
  `,
  'does not update import path if fromPackage and toPackage are the same',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box} from '@legacy/ui'
  import {Card} from '@legacy/ui'

  <>
    <Box />
    <Card />
  </>
  `,
  `
  import {Box} from "@sanity/ui"
  import {Card} from '@legacy/ui'

  <>
    <Box />
    <Card />
  </>
  `,
  'only updates import path for current component',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box, Card} from '@legacy/ui'

  <>
    <Box />
    <Card />
  </>
  `,
  `
  import { Card } from '@legacy/ui';

  import { Box } from "@sanity/ui";

  <>
    <Box />
    <Card />
  </>
  `,
  'splits mixed imports and only updates import path for current component',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box} from '@legacy/ui'
  import {Card} from "@sanity/ui";

  <>
    <Box />
    <Card />
  </>
  `,
  `
  import { Box, Card } from "@sanity/ui";

  <>
    <Box />
    <Card />
  </>
  `,
  'combines imports with the same import path',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box, Stack} from '@legacy/ui'
  import {Card} from "@sanity/ui";

  <>
    <Box />
    <Stack />
    <Card />
  </>
  `,
  `
  import { Stack } from '@legacy/ui';
  import { Box, Card } from "@sanity/ui";

  <>
    <Box />
    <Stack />
    <Card />
  </>
  `,
  'splits mixed imports and combines with existing import of the same path',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box, BoxProps} from '@legacy/ui'

  <Box />
  `,
  `
  import {Box, BoxProps} from "@sanity/ui"

  <Box />
  `,
  'updates import path for type import',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box, type BoxProps} from '@legacy/ui'

  <Box />
  `,
  `
  import {Box, type BoxProps} from "@sanity/ui"

  <Box />
  `,
  'updates import path for with type keyword inside',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box} from '@legacy/ui'
  import type {BoxProps} from '@legacy/ui'

  <Box />
  `,
  `
  import { Box, type BoxProps } from "@sanity/ui";

  <Box />
  `,
  'updates import path for with type keyword outside',
)
