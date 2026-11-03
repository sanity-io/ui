import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './spinner'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Spinner} from '@legacy/ui'

  <Spinner />
  `,
  `
  import {Spinner} from "@sanity/ui"

  <Spinner />
  `,
  'updates Spinner import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Spinner muted />
  `,
  `
  <Spinner style={{
    color: "var(--foreground-low)"
  }} />
  `,
  'moves muted prop to style',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Spinner} from '@sanity/ui'

    export const RootSpinner = styled(Spinner)(({theme}) => ({}))
  `,
  `
    import {RootSpinner} from './Component.styled'

    export function Component() {
      return <RootSpinner muted />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootSpinner style={{ color: "var(--foreground-low)" }} />',
    )
  },
  'transforms attributes on imported styled Spinner wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Spinner} from '@sanity/ui'

    export const RootSpinner = styled(Spinner)(({theme}) => ({}))
  `,
  `
    import {Spinner} from 'another-package'
    import {RootSpinner} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootSpinner muted />
          <Spinner muted />
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootSpinner style={{ color: "var(--foreground-low)" }} />',
    )
    expect(output).toContain('<Spinner muted />')
  },
  'does not transform attributes on unrelated Spinner from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Spinner} from '@sanity/ui'

    export const RootSpinner = styled(Spinner)(({theme}) => ({}))
  `,
  `
    import {RootSpinner} from './index'

    export function Component() {
      return <RootSpinner muted />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootSpinner style={{ color: "var(--foreground-low)" }} />',
    )
  },
  'transforms styled Spinner wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootSpinner} from './Component.styled'`,
    },
  },
)
