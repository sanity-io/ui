import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './text-area'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {TextArea} from '@legacy/ui'

  <TextArea />
  `,
  `
  import {TextArea} from "@sanity/ui"

  <TextArea />
  `,
  'updates TextArea import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea padding={3} />
  `,
  `
  <TextArea style={{
    padding: "var(--space-3)"
  }} />
  `,
  'moves the padding prop to a style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea fontSize={2} />
  `,
  `
  <TextArea style={{
    font: "var(--body-2)"
  }} />
  `,
  'moves the fontSize prop to a font style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea radius={2} />
  `,
  `
  <TextArea style={{
    borderRadius: "var(--radius-2)"
  }} />
  `,
  'moves the radius prop to a borderRadius style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea weight="semibold" />
  `,
  `
  <TextArea style={{
    fontWeight: "var(--semibold)"
  }} />
  `,
  'moves the weight prop to a fontWeight style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea border={false} />
  `,
  `
  <TextArea style={{
    border: "none"
  }} />
  `,
  'moves border={false} to a style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea border />
  `,
  `
  // UI-CODEMOD TODO: Please double check the TextArea migration below
  <TextArea border />
  `,
  'warns on border={true} because v5 draws the border by default',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea customValidity="Required" />
  `,
  `
  // UI-CODEMOD TODO: Please double check the TextArea migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.
  <TextArea customValidity="Required" />
  `,
  'warns on the unsupported customValidity prop',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea __unstable_disableFocusRing />
  `,
  `
  // UI-CODEMOD TODO: Please double check the TextArea migration below. The __unstable_disableFocusRing prop is no longer supported.
  <TextArea __unstable_disableFocusRing />
  `,
  'warns on the unsupported __unstable_disableFocusRing prop',
)

defineInlineTest(
  transform,
  {},
  `
  <TextArea padding={3} rows={5} disabled data-testid="field" />
  `,
  `
  <TextArea rows={5} disabled data-testid="field" style={{
    padding: "var(--space-3)"
  }} />
  `,
  'leaves pass-through props such as rows, disabled and data-testid alone',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {TextArea} from '@sanity/ui'

    export const RootTextArea = styled(TextArea)(({theme}) => ({}))
  `,
  `
    import {RootTextArea} from './Component.styled'

    export function Component() {
      return <RootTextArea radius={2} />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootTextArea style={{ borderRadius: "var(--radius-2)" }} />',
    )
  },
  'transforms attributes on imported styled TextArea wrappers',
)
