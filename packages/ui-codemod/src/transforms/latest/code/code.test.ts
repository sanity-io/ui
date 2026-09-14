import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './code'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Code} from '@legacy/ui'

  <Code />
  `,
  `
  import {Code} from "@sanity/ui"

  <Code trim={true} />
  `,
  'updates Code import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Code />
  `,
  `
  <Code trim={true} />
  `,
  'adds trim prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Code flex="auto" />
  `,
  `
  <Code
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
  <Code width={1} maxWidth="fill" />
  `,
  `
  <Code style={{
    width: "40rem",
    maxWidth: "100%"
  }} trim={true} />
  `,
  'moves width props to style and uppdates mapped values',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Code} from '@sanity/ui'

    export const RootCode = styled(Code)(({theme}) => ({}))
  `,
  `
    import {RootCode} from './Component.styled'

    export function RootCode() {
      return <RootCode flex="auto" />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootCode style={{ flex: "1 1 auto" }} trim={true} />',
    )
  },
  'transforms attributes on imported styled Code wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Code} from '@sanity/ui'

    export const RootCode = styled(Code)(({theme}) => ({}))
  `,
  `
    import {Code} from 'another-package'
    import {RootCode} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootCode flex="auto" />
          <Code flex="auto" />
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootCode style={{ flex: "1 1 auto" }} trim={true} />',
    )
    expect(output).toContain('<Code flex="auto" />')
  },
  'does not transform attributes on unrelated Code from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Code} from '@sanity/ui'

    export const RootCode = styled(Code)(({theme}) => ({}))
  `,
  `
    import {RootCode} from './index'

    export function Component() {
      return <RootCode flex="auto" />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootCode style={{ flex: "1 1 auto" }} trim={true} />',
    )
  },
  'transforms styled Code wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootCode} from './Component.styled'`,
    },
  },
)
