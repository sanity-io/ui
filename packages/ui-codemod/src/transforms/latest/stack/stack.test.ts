import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
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

defineCrossFileTest(
  transform,
  {},
  `
    import {Stack} from '@sanity/ui'

    export const RootStack = styled(Stack)(({theme}) => ({}))
  `,
  `
    import {RootStack} from './Component.styled'

    export function Component() {
      return <RootStack space={2} />
    }
  `,
  (output) => {
    expect(output).toContain('<RootStack gap={2} />')
  },
  'transforms attributes on imported styled Stack wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Stack} from '@sanity/ui'

    export const RootStack = styled(Stack)(({theme}) => ({}))
  `,
  `
    import {RootStack} from './Component.styled'

    export function Component() {
      return <RootStack padding={2} />
    }
  `,
  (output) => {
    expect(output).toContain('UI-CODEMOD TODO: Please double check styled(Stack) migration below')
    expect(output).toContain('<RootStack padding={2} />')
  },
  'adds todo warning when imported styled Stack wrapper should be replaced',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Stack} from '@sanity/ui'

    export const RootStack = styled(Stack)(({theme}) => ({}))
  `,
  `
    import {Stack} from 'another-package'
    import {RootStack} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootStack space={2} />
          <Stack space={2} />
        </>
      )
    }
  `,
  (output) => {
    expect(output).toContain('<RootStack gap={2} />')
    expect(output).toContain('<Stack space={2} />')
  },
  'does not rewrite unrelated Stack from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Stack} from '@sanity/ui'

    export const RootStack = styled(Stack)(({theme}) => ({}))
  `,
  `
    import {RootStack} from './index'

    export function Component() {
      return <RootStack space={2} />
    }
  `,
  (output) => {
    expect(output).not.toContain('<RootStack space={2} />')
  },
  'transforms styled Stack wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootStack} from './Component.styled'`,
    },
  },
)
