import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './kbd'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {KBD} from '@legacy/ui'

  <KBD />
  `,
  `
  import {KBD} from "@sanity/ui"

  <KBD />
  `,
  'updates KBD import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {KBD} from '@legacy/ui'

  <KBD size={1} />
  `,
  `
  import {KBD} from "@sanity/ui"

  <KBD />
  `,
  'removes deprecated props',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {KBD} from '@legacy/ui'

  <KBD fontSize={1} padding={1} radius={1} />
  `,
  `
  import {KBD} from "@sanity/ui"

  <KBD
    style={{
      font: "var(--body-1)",
      padding: "var(--space-1)",
      borderRadius: "var(--radius-1)"
    }} />
  `,
  'moves deprecated props to style',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {KBD} from '@legacy/ui'

  <KBD>Ctrl</KBD>
  `,
  `
  import {KBD} from "@sanity/ui"

  <KBD text="Ctrl" />
  `,
  'transforms children to text',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {KBD} from '@legacy/ui'

  <KBD><Text>Ctrl</Text></KBD>
  `,
  `
  import {KBD} from "@sanity/ui"

  // UI-CODEMOD TODO: Please double check the KBD migration below. Move children into the text prop.
  <KBD><Text>Ctrl</Text></KBD>
  `,
  'warns if children is not string',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {KBD} from '@sanity/ui'

    export const RootKBD = styled(KBD)(({theme}) => ({}))
  `,
  `
    import {RootKBD} from './Component.styled'

    export function RootAvatar() {
      return <RootKBD>Ctrl</RootKBD>
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootKBD text="Ctrl" />')
  },
  'transforms attributes on imported styled KBD wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {KBD} from '@sanity/ui'

    export const RootKBD = styled(KBD)(({theme}) => ({}))
  `,
  `
    import {KBD} from 'another-package'
    import {RootKBD} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootKBD>Ctrl</RootKBD>
          <KBD>Ctrl</KBD>
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootKBD text="Ctrl" />')
    expect(output).toContain('<KBD>Ctrl</KBD>')
  },
  'does not transform attributes on unrelated KBD from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {KBD} from '@sanity/ui'

    export const RootKBD = styled(KBD)(({theme}) => ({}))
  `,
  `
    import {RootKBD} from './index'

    export function Component() {
      return <RootKBD>Ctrl</RootKBD>
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootKBD text="Ctrl" />')
  },
  'transforms styled KBD wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootKBD} from './Component.styled'`,
    },
  },
)
