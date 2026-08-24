import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './container'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Container} from '@legacy/ui'

  <Container />
  `,
  `
  import {Container} from "@sanity/ui"

  <Container />
  `,
  'updates Container import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Container width={2} />
  `,
  `
  <Container size={2} />
  `,
  'renames width to size',
)

defineInlineTest(
  transform,
  {},
  `
  <Container width={[1, 2, 3]} />
  `,
  `
  <Container size={[1, 2, 3]} />
  `,
  'renames responsive width to size',
)

defineInlineTest(
  transform,
  {},
  `
  <Container
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  `
  <Container
    style={{
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    }} />
  `,
  'moves flex props to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Container
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  `
  <Container
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
  <Container
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Container
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
    import {Container} from '@sanity/ui'

    export const RootContainer = styled(Container)(({theme}) => ({}))
  `,
  `
    import {RootContainer} from './Component.styled'

    export function Component() {
      return <RootContainer width={2} />
    }
  `,
  (output) => {
    expect(output).toContain('<RootContainer size={2} />')
  },
  'transforms attributes on imported styled Container wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Container} from '@sanity/ui'

    export const RootContainer = styled(Container)(({theme}) => ({}))
  `,
  `
    import {Container} from 'another-package'
    import {RootContainer} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootContainer width={2} />
          <Container width={2} />
        </>
      )
    }
  `,
  (output) => {
    expect(output).toContain('<RootContainer size={2} />')
    expect(output).toContain('<Container width={2} />')
  },
  'does not transform attributes on unrelated Container from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Container} from '@sanity/ui'

    export const RootContainer = styled(Container)(({theme}) => ({}))
  `,
  `
    import {RootContainer} from './index'

    export function Component() {
      return <RootContainer width={2} />
    }
  `,
  (output) => {
    expect(output).toContain('<RootContainer size={2} />')
  },
  'transforms styled Container wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootContainer} from './Component.styled'`,
    },
  },
)
