import {defineInlineTest} from '../../../utils/testUtils'
import transform from './heading'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Heading} from '@legacy/ui'

  <Heading as="h1" />
  `,
  `
  import {Heading} from "@sanity/ui"

  <Heading as="h1" trim={true} />
  `,
  'updates Heading import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading as="h1" />
  `,
  `
  <Heading as="h1" trim={true} />
  `,
  'adds trim prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading as="h1" flex="auto" />
  `,
  `
  <Heading
    as="h1"
    style={{
      flex: "1 1 auto"
    }}
    trim={true} />
  `,
  'moves flex prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading as="h1" textOverflow="ellipsis" />
  `,
  `
  <Heading as="h1" truncate={1} trim={true} />
  `,
  'renames textOverflow prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading as="h1" width={1} maxWidth="fill" />
  `,
  `
  <Heading as="h1" style={{
    width: "40rem",
    maxWidth: "100%"
  }} trim={true} />
  `,
  'moves width props to style and uppdates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading />
  `,
  `
  // UI-POC-CODEMOD TODO: Please double check the Heading migration below. The as prop is missing and will default to h2.
  <Heading trim={true} />
  `,
  'warns if as props is missing',
)
