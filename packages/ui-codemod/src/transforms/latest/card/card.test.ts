import {defineInlineTest} from '../../../utils/testUtils'
import transform from './card'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Card} from '@legacy/ui'

  <Card padding={4} radius={3} border />
  `,
  `
  import {Card} from "@sanity/ui"

  <Card density="regular" />
  `,
  'updates Card import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Card} from '@legacy/ui'

  <Card />
  `,
  `
  import {Box} from "@sanity/ui"

  <Box />
  `,
  'replaces Card and updates import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Card, Text} from '@legacy/ui'

  <Card />
  `,
  `
  import { Text } from '@legacy/ui';

  import { Box } from "@sanity/ui";

  <Box />
  `,
  'replaces Card and updates import path with multiple specifiers',
)

defineInlineTest(
  transform,
  {},
  `
  <Card padding={4} radius={3} border />
  `,
  `
  <Card density="regular" />
  `,
  'preserves Card if padding and radius match density',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  <Card padding={2} border={true} />
  `,
  `
  import {Box} from '@sanity/ui'

  <Box padding={2} border={true} />
  `,
  'replaces Card with Box if padding and radius do not match density',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  <>
    <Card padding={1} />
    <Card padding={4} radius={3} border />
  </>
  `,
  `
  import { Card, Box } from '@sanity/ui';

  <>
    <Box padding={1} />
    <Card density="regular" />
  </>
  `,
  'replaces Card with Box and adds Box import',
)

defineInlineTest(
  transform,
  {},
  `
  import {Card} from '@sanity/ui'

  <Card padding={1} />
  `,
  `
  import {Box} from '@sanity/ui'

  <Box padding={1} />
  `,
  'replaces Card with Box and removes Card import',
)

defineInlineTest(
  transform,
  {},
  `
  <Card padding={1}>
    <span />
  </Card>
  `,
  `
  <Box padding={1}>
    <span />
  </Box>
  `,
  'replaces Card with Box and updates closing tag',
)

defineInlineTest(
  transform,
  {},
  `
  <Card padding={4} radius={3} border sizing="content" />
  `,
  `
  <Card
    density="regular"
    style={{
      boxSizing: "content-box"
    }} />
  `,
  'preserves Card and transforms attributes',
)

defineInlineTest(
  transform,
  {},
  `
  <Card padding={1} alignItems="center" />
  `,
  `
  <Box padding={1} style={{
    alignItems: "center"
  }} />
  `,
  'replaces Card with Box and transforms attributes',
)

defineInlineTest(
  transform,
  {},
  `
  <Card
    padding={3}
    border
    radius={2}
    style={{ borderStyle: 'dotted' }}
  />
  `,
  `
  <Card density="compact" style={{ borderStyle: 'dotted' }} />
  `,
  'preserves Card and transforms attributes with style',
)

defineInlineTest(
  transform,
  {},
  `
  <Card scheme="light" />
  `,
  `
  // UI-POC-CODEMOD TODO: Please double check the Card migration below. The scheme prop has been deprecated.
  <Card scheme="light" />
  `,
  'warns if Card includes scheme prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Card muted />
  `,
  `
  // UI-POC-CODEMOD TODO: Please double check the Card migration below. The muted prop has been deprecated.
  <Card muted />
  `,
  'warns if Card includes muted prop',
)
