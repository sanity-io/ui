import {defineInlineTest} from '../../../utils/testUtils'
import transform from './stack'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Stack} from '@legacy/ui'

  <Stack />
  `,
  `
  import {VStack} from "@sanity/ui"

  <VStack />
  `,
  'renames Stack and updates import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Stack} from '@legacy/ui'

  <Stack padding={2} />
  `,
  `
  import {Flex} from "@sanity/ui"

  <Flex padding={2} flexDirection="column" />
  `,
  'replaces Stack with Flex and updates import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Stack, Text} from '@legacy/ui'

  <Stack />
  `,
  `
  import { Text } from '@legacy/ui';

  import { VStack } from "@sanity/ui";

  <VStack />
  `,
  'renames Stack and updates import path with multiple specifiers',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Stack, Text} from '@legacy/ui'

  <Stack margin={2} />
  `,
  `
  import { Text } from '@legacy/ui';

  import { Flex } from "@sanity/ui";

  <Flex margin={2} flexDirection="column" />
  `,
  'replaces Stack and updates import path with multiple specifiers',
)

defineInlineTest(
  transform,
  {},
  `
  <Stack gap={2} />
  `,
  `
  <VStack gap={2} />
  `,
  'renames Stack with gap',
)

defineInlineTest(
  transform,
  {},
  `
  <Stack space={2} sizing="border" />
  `,
  `
  <VStack gap={2} />
  `,
  'renames Stack and transforms attributes',
)

defineInlineTest(
  transform,
  {},
  `
  import {Stack} from '@sanity/ui'

  <>
    <Stack />
    <Stack overflow="auto" />
  </>
  `,
  `
  import { Flex, VStack } from '@sanity/ui';

  <>
    <VStack />
    <Flex overflow="auto" flexDirection="column" />
  </>
  `,
  'replaces Stack with Flex and adds Flex import',
)

defineInlineTest(
  transform,
  {},
  `
  import {Stack} from '@sanity/ui'

  <Stack padding={1} />
  `,
  `
  import {Flex} from '@sanity/ui'

  <Flex padding={1} flexDirection="column" />
  `,
  'replaces Stack with Flex and removes Stack import',
)

defineInlineTest(
  transform,
  {},
  `
  <Stack padding={1}>
    <span />
  </Stack>
  `,
  `
  <Flex padding={1} flexDirection="column">
    <span />
  </Flex>
  `,
  'replaces Stack with Flex and updates closing tag',
)

defineInlineTest(
  transform,
  {},
  `
  <Stack padding={1} width="fill" />
  `,
  `
  <Flex padding={1} width="100%" flexDirection="column" />
  `,
  'replaces Stack with Flex and transforms attributes',
)
