import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './label'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Label} from '@legacy/ui'

  <Label />
  `,
  `
  import {Eyebrow} from "@sanity/ui"

  <Eyebrow as="div" trim={true} />
  `,
  'updates Eyebrow import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Label />
  `,
  `
  <Eyebrow as="div" trim={true} />
  `,
  'adds trim prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Label />
  `,
  `
  <Eyebrow as="div" trim={true} />
  `,
  'adds as prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Label as="span" />
  `,
  `
  <Eyebrow as="span" trim={true} />
  `,
  'does not add as prop if already set',
)

defineInlineTest(
  transform,
  {},
  `
  <Label flex="auto" />
  `,
  `
  <Eyebrow
    style={{
      flex: "1 1 auto"
    }}
    as="div"
    trim={true} />
  `,
  'moves flex prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Label accent />
  `,
  `
  <Eyebrow tone="suggest" as="div" trim={true} />
  `,
  'renames accent prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Label textOverflow="ellipsis" />
  `,
  `
  <Eyebrow truncate={1} as="div" trim={true} />
  `,
  'renames textOverflow prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Label width={1} maxWidth="fill" />
  `,
  `
  <Eyebrow
    style={{
      width: "40rem",
      maxWidth: "100%"
    }}
    as="div"
    trim={true} />
  `,
  'moves width props to style and updates mapped value',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Label} from '@sanity/ui'

    export const RootLabel = styled(Label)(({theme}) => ({}))
  `,
  `
    import {RootLabel} from './Component.styled'

    export function RootCode() {
      return <RootLabel flex="auto" />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootLabel style={{ flex: "1 1 auto" }} as="div" trim={true} />',
    )
  },
  'transforms attributes on imported styled Label wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Label} from '@sanity/ui'

    export const RootLabel = styled(Label)(({theme}) => ({}))
  `,
  `
    import {Label} from 'another-package'
    import {RootLabel} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootLabel flex="auto" />
          <Label flex="auto" />
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootLabel style={{ flex: "1 1 auto" }} as="div" trim={true} />',
    )
    expect(output).toContain('<Label flex="auto" />')
  },
  'does not transform attributes on unrelated Label from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Label} from '@sanity/ui'

    export const RootLabel = styled(Label)(({theme}) => ({}))
  `,
  `
    import {RootLabel} from './index'

    export function Component() {
      return <RootLabel flex="auto" />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootLabel style={{ flex: "1 1 auto" }} as="div" trim={true} />',
    )
  },
  'transforms styled Label wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootLabel} from './Component.styled'`,
    },
  },
)
