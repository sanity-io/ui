import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
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
  'replaces Card with Box and updates import path based on fromPackage and toPackage',
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
  // UI-CODEMOD TODO: Please double check the Card migration below. The scheme prop has been deprecated.
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
  // UI-CODEMOD TODO: Please double check the Card migration below. The muted prop has been deprecated.
  <Card muted />
  `,
  'warns if Card includes muted prop',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Card} from '@sanity/ui'

    export const RootCard = styled(Card)(({theme}) => ({}))
  `,
  `
    import {RootCard} from './Component.styled'

    export function Component() {
      return <RootCard padding={4} radius={3} border />
    }
  `,
  (output) => {
    expect(output).toContain('<RootCard density="regular" />')
  },
  'transforms attributes on imported styled Card wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Card} from '@sanity/ui'

    export const RootCard = styled(Card)(({theme}) => ({}))
  `,
  `
    import {RootCard} from './Component.styled'

    export function Component() {
      return <RootCard padding={1} />
    }
  `,
  (output) => {
    expect(output).toContain('UI-CODEMOD TODO: Please double check styled(Card) migration below')
    expect(output).toContain('<RootCard padding={1} />')
  },
  'adds todo warning when imported styled Card wrapper should be replaced',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Card} from '@sanity/ui'

    export const RootCard = styled(Card)(({theme}) => ({}))
  `,
  `
    import {Card} from 'another-package'
    import {RootCard} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootCard padding={4} radius={3} border />
          <Card padding={4} radius={3} border />
        </>
      )
    }
  `,
  (output) => {
    expect(output).toContain('<RootCard density="regular" />')
    expect(output).toContain('<Card padding={4} radius={3} border />')
  },
  'does not rewrite unrelated Card from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Card} from '@sanity/ui'

    export const RootCard = styled(Card)(({theme}) => ({}))
  `,
  `
    import {RootCard} from './index'

    export function Component() {
      return <RootCard padding={4} radius={3} border />
    }
  `,
  (output) => {
    expect(output).toContain('<RootCard density="regular" />')
  },
  'transforms styled Card wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootCard} from './Component.styled'`,
    },
  },
)
