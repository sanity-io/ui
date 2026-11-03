import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './text-input'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {TextInput} from '@legacy/ui'

  <TextInput />
  `,
  `
  import {TextInput} from "@sanity/ui"

  <TextInput />
  `,
  'updates TextInput import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput space={3} />
  `,
  `
  <TextInput />
  `,
  'removes the deprecated space prop',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput gap={2} />
  `,
  `
  <TextInput />
  `,
  'removes the unsupported gap prop',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput padding={3} />
  `,
  `
  <TextInput style={{
    padding: "var(--space-3)"
  }} />
  `,
  'moves the padding prop to a style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput fontSize={2} />
  `,
  `
  <TextInput style={{
    font: "var(--body-2)"
  }} />
  `,
  'moves the fontSize prop to a font style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput radius={2} />
  `,
  `
  <TextInput style={{
    borderRadius: "var(--radius-2)"
  }} />
  `,
  'moves the radius prop to a borderRadius style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput weight="semibold" />
  `,
  `
  <TextInput style={{
    fontWeight: "var(--semibold)"
  }} />
  `,
  'moves the weight prop to a fontWeight style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput border={false} />
  `,
  `
  <TextInput style={{
    border: "none"
  }} />
  `,
  'moves border={false} to a style value',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput border />
  `,
  `
  // UI-CODEMOD TODO: Please double check the TextInput migration below
  <TextInput border />
  `,
  'warns on border={true} because v5 draws the border by default',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput customValidity="Required" />
  `,
  `
  // UI-CODEMOD TODO: Please double check the TextInput migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.
  <TextInput customValidity="Required" />
  `,
  'warns on the unsupported customValidity prop',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput icon={SearchIcon} />
  `,
  `
  // UI-CODEMOD TODO: Please double check the TextInput migration below. The icon prop is no longer supported.
  <TextInput icon={SearchIcon} />
  `,
  'warns on the unsupported icon prop',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput prefix="https://" />
  `,
  `
  // UI-CODEMOD TODO: Please double check the TextInput migration below. The prefix prop is no longer supported.
  <TextInput prefix="https://" />
  `,
  'warns on the unsupported prefix prop',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput clearButton />
  `,
  `
  // UI-CODEMOD TODO: Please double check the TextInput migration below. The clearButton prop is no longer supported.
  <TextInput clearButton />
  `,
  'warns on the unsupported clearButton prop',
)

defineInlineTest(
  transform,
  {},
  `
  <TextInput space={3} type="email" disabled data-testid="field" />
  `,
  `
  <TextInput type="email" disabled data-testid="field" />
  `,
  'leaves pass-through props such as type, disabled and data-testid alone',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {TextInput} from '@sanity/ui'

    export const RootTextInput = styled(TextInput)(({theme}) => ({}))
  `,
  `
    import {RootTextInput} from './Component.styled'

    export function Component() {
      return <RootTextInput radius={2} />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootTextInput style={{ borderRadius: "var(--radius-2)" }} />',
    )
  },
  'transforms attributes on imported styled TextInput wrappers',
)
