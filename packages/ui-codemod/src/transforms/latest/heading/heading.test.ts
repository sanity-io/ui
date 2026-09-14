import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
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
  // UI-CODEMOD TODO: Please double check the Heading migration below. The as prop is missing and will default to h2.
  <Heading trim={true} />
  `,
  'warns if as props is missing',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Heading} from '@sanity/ui'

    export const RootHeading = styled(Heading)(({theme}) => ({}))
  `,
  `
    import {RootHeading} from './Component.styled'

    export function RootCode() {
      return <RootHeading flex="auto" />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootHeading style={{ flex: "1 1 auto" }} trim={true} />',
    )
  },
  'transforms attributes on imported styled Heading wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Heading} from '@sanity/ui'

    export const RootHeading = styled(Heading)(({theme}) => ({}))
  `,
  `
    import {Heading} from 'another-package'
    import {RootHeading} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootHeading flex="auto" />
          <Heading flex="auto" />
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootHeading style={{ flex: "1 1 auto" }} trim={true} />',
    )
    expect(output).toContain('<Heading flex="auto" />')
  },
  'does not transform attributes on unrelated Heading from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Heading} from '@sanity/ui'

    export const RootHeading = styled(Heading)(({theme}) => ({}))
  `,
  `
    import {RootHeading} from './index'

    export function Component() {
      return <RootHeading flex="auto" />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootHeading style={{ flex: "1 1 auto" }} trim={true} />',
    )
  },
  'transforms styled Heading wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootHeading} from './Component.styled'`,
    },
  },
)
