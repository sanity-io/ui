import {defineInlineTest} from '../../../utils/testUtils'
import transform from './box'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box} from '@legacy/ui'

  <Box />
  `,
  `
  import {Box} from "@sanity/ui"

  <Box />
  `,
  'updates Box import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Box
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  `
  <Box
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
  <Box
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  `
  <Box
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
  <Box
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Box
    style={{
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)"
    }} />
  `,
  'moves grid props to style and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  import {Box} from '@sanity/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return <RootBox alignItems="center" />
  }
  `,
  `
  import {Box} from '@sanity/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return (
      <RootBox style={{
        alignItems: "center"
      }} />
    );
  }
  `,
  'transforms attributes on styled component',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box} from '@legacy/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return <RootBox alignItems="center" />
  }
  `,
  `
  import {Box} from "@sanity/ui"

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return (
      <RootBox style={{
        alignItems: "center"
      }} />
    );
  }
  `,
  'transforms attributes on styled component and updates import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  import {Box as ImportedBox} from '@sanity/ui'

  <ImportedBox alignItems="center" />
  `,
  `
  import {Box as ImportedBox} from '@sanity/ui'

  <ImportedBox style={{
    alignItems: "center"
  }} />
  `,
  'transforms attributes on aliased import',
)

defineInlineTest(
  transform,
  {},
  `
  <Box display="flex" alignItems="center" />
  `,
  `
  <Flex display="flex" alignItems="center" />
  `,
  'replaces Box with Flex when display is flex',
)

defineInlineTest(
  transform,
  {},
  `
  <Box display="grid" gridAutoFlow="row" />
  `,
  `
  <Grid display="grid" gridAutoFlow="row" />
  `,
  'replaces Box with Grid when display is grid',
)

defineInlineTest(
  transform,
  {},
  `
  import {Box} from '@sanity/ui'

  function Example() {
    const RootBox = styled(Box)(({theme}) => ({}))

    return <RootBox display="flex" alignItems="center" />
  }
  `,
  `
  import {Box} from '@sanity/ui'

  function Example() {
    // UI-CODEMOD TODO: Please double check styled(Box) migration(s) below
    const RootBox = styled(Box)(({theme}) => ({}));

    return <RootBox display="flex" alignItems="center" />
  }
  `,
  'warns and does not transform attributes if styled Box definition should be replaced',
)
