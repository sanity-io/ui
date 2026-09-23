import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './select'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Select} from '@legacy/ui'

  <Select />
  `,
  `
  import {Select} from "@sanity/ui"

  <Select />
  `,
  'updates Select import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Select space={3} />
  `,
  `
  <Select />
  `,
  'removes the deprecated space prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Select padding={3} />
  `,
  `
  <Select style={{
    padding: "var(--space-3)"
  }} />
  `,
  'moves the padding prop to a style value',
)

defineInlineTest(
  transform,
  {},
  `
  <Select fontSize={2} />
  `,
  `
  <Select style={{
    font: "var(--body-2)"
  }} />
  `,
  'moves the fontSize prop to a font style value',
)

defineInlineTest(
  transform,
  {},
  `
  <Select radius={2} />
  `,
  `
  <Select style={{
    borderRadius: "var(--radius-2)"
  }} />
  `,
  'moves the radius prop to a borderRadius style value',
)

defineInlineTest(
  transform,
  {},
  `
  <Select gap={2} />
  `,
  `
  <Select />
  `,
  'removes the unsupported gap prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Select customValidity="Required" />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Select migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.
  <Select customValidity="Required" />
  `,
  'warns on the unsupported customValidity prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Select readOnly />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Select migration below. The readOnly prop is no longer valid, as the readonly HTML attribute is invalid on select elements.
  <Select readOnly />
  `,
  'warns on the unsupported readOnly prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Select space={3} disabled value={value} onChange={onChange} data-testid="picker" />
  `,
  `
  <Select disabled value={value} onChange={onChange} data-testid="picker" />
  `,
  'leaves pass-through props such as disabled and data-testid alone',
)

defineInlineTest(
  transform,
  {},
  `
  <Select space={3} value={value} onChange={onChange}>
    <option value="a">A</option>
    <option value="b">B</option>
  </Select>
  `,
  `
  <Select value={value} onChange={onChange}>
    <option value="a">A</option>
    <option value="b">B</option>
  </Select>
  `,
  'leaves the option children intact',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Select} from '@sanity/ui'

    export const RootSelect = styled(Select)(({theme}) => ({}))
  `,
  `
    import {RootSelect} from './Component.styled'

    export function Component() {
      return <RootSelect radius={2} />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootSelect style={{ borderRadius: "var(--radius-2)" }} />',
    )
  },
  'transforms attributes on imported styled Select wrappers',
)
