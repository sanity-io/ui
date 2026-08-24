import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './grid'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Grid} from '@legacy/ui'

  <Grid />
  `,
  `
  import {Grid} from "@sanity/ui"

  <Grid />
  `,
  'updates Grid import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  `
  <Grid
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
  <Grid
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Grid
    gridTemplateColumns="repeat(1, 1fr)"
    gridTemplateRows="repeat(2, 1fr)"
  />
  `,
  'updates grid props mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid
    autoCols="auto"
    autoFlow="row"
    autoRows="auto"
  />
  `,
  `
  <Grid
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  'renames v3 grid props',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid
    columns={1}
    rows={2}
  />
  `,
  `
  <Grid
    gridTemplateColumns="repeat(1, 1fr)"
    gridTemplateRows="repeat(2, 1fr)"
  />
  `,
  'updates v3 grid props mapped values',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Grid} from '@sanity/ui'

    export const RootGrid = styled(Grid)(({theme}) => ({}))
  `,
  `
    import {RootGrid} from './Component.styled'

    export function Component() {
      return <RootGrid autoCols="auto" />
    }
  `,
  (output) => {
    expect(output).toContain('<RootGrid gridAutoColumns="auto" />')
  },
  'transforms attributes on imported styled Grid wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Grid} from '@sanity/ui'

    export const RootGrid = styled(Grid)(({theme}) => ({}))
  `,
  `
    import {Grid} from 'another-package'
    import {RootGrid} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootGrid autoCols="auto" />
          <Grid autoCols="auto" />
        </>
      )
    }
  `,
  (output) => {
    expect(output).toContain('<RootGrid gridAutoColumns="auto" />')
    expect(output).toContain('<Grid autoCols="auto" />')
  },
  'does not transform attributes on unrelated Grid from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Grid} from '@sanity/ui'

    export const RootGrid = styled(Grid)(({theme}) => ({}))
  `,
  `
    import {RootGrid} from './index'

    export function Component() {
      return <RootGrid autoCols="auto" />
    }
  `,
  (output) => {
    expect(output).toContain('<RootGrid gridAutoColumns="auto" />')
  },
  'transforms styled Grid wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootGrid} from './Component.styled'`,
    },
  },
)
