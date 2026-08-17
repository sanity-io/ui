import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './flex'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Flex} from '@legacy/ui'

  <Flex />
  `,
  `
  import {Flex} from "@sanity/ui"

  <Flex />
  `,
  'updates Flex import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex
    align="center"
    direction="row"
    wrap="wrap"
    justify="center"
  />
  `,
  `
  <Flex
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  'renames flex props',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  `
  <Flex
    style={{
      gridAutoColumns: "auto",
      gridAutoFlow: "row",
      gridAutoRows: "auto"
    }} />
  `,
  'moves grid props to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Flex
    style={{
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)"
    }} />
  `,
  'moves grid props to style and updates mapped values',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Flex} from '@sanity/ui'

    export const RootFlex = styled(Flex)(({theme}) => ({}))
  `,
  `
    import {RootFlex} from './Component.styled'

    export function Component() {
      return <RootFlex align="center" />
    }
  `,
  (output) => {
    expect(output).toContain('<RootFlex alignItems="center" />')
  },
  'transforms attributes on imported styled Flex wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Flex} from '@sanity/ui'

    export const RootFlex = styled(Flex)(({theme}) => ({}))
  `,
  `
    import {Flex} from 'another-package'
    import {RootFlex} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootFlex align="center" />
          <Flex direction="column" />
        </>
      )
    }
  `,
  (output) => {
    expect(output).toContain('<RootFlex alignItems="center" />')
    expect(output).toContain('<Flex direction="column" />')
  },
  'does not transform attributes on unrelated Flex from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Flex} from '@sanity/ui'

    export const RootFlex = styled(Flex)(({theme}) => ({}))
  `,
  `
    import {RootFlex} from './index'

    export function Component() {
      return <RootFlex align="center" />
    }
  `,
  (output) => {
    expect(output).toContain('<RootFlex alignItems="center" />')
  },
  'transforms styled Box wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootFlex} from './Component.styled'`,
    },
  },
)
