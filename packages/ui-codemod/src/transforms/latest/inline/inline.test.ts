import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './inline'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Inline} from '@legacy/ui'

  <Inline />
  `,
  `
  import {Inline} from "@sanity/ui"

  <Inline />
  `,
  'updates Inline import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Inline space={2} />
  `,
  `
  <Inline gap={2} />
  `,
  'renames space prop to gap',
)

defineInlineTest(
  transform,
  {},
  `
  <Inline flex="auto" />
  `,
  `
  <Inline style={{
    flex: "1 1 auto"
  }} />
  `,
  'moves flex prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Inline margin={2} />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Inline migration below. Margin is not supported in either version.
  <Inline margin={2} />
  `,
  'warns if margin prop is present',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Inline} from '@sanity/ui'

    export const RootInline = styled(Inline)(({theme}) => ({}))
  `,
  `
    import {RootInline} from './Component.styled'

    export function Component() {
      return <RootInline space={2} />
    }
  `,
  (output) => {
    expect(output).toContain('<RootInline gap={2} />')
  },
  'transforms attributes on imported styled Inline wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Inline} from '@sanity/ui'

    export const RootInline = styled(Inline)(({theme}) => ({}))
  `,
  `
    import {Inline} from 'another-package'
    import {RootInline} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootInline space={2} />
          <Inline space={2} />
        </>
      )
    }
  `,
  (output) => {
    expect(output).toContain('<RootInline gap={2} />')
    expect(output).toContain('<Inline space={2} />')
  },
  'does not transform attributes on unrelated Inline from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Inline} from '@sanity/ui'

    export const RootInline = styled(Inline)(({theme}) => ({}))
  `,
  `
    import {RootInline} from './index'

    export function Component() {
      return <RootInline space={2} />
    }
  `,
  (output) => {
    expect(output).toContain('<RootInline gap={2} />')
  },
  'transforms styled Inline wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootInline} from './Component.styled'`,
    },
  },
)
