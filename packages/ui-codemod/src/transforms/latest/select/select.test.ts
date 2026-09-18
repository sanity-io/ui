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
  // UI-CODEMOD TODO: Please double check the Select migration below. The padding prop is no longer supported. Use the density prop (regular or loose) instead.
  <Select padding={3} />
  `,
  'warns on the unsupported padding prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Select fontSize={2} />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Select migration below. The fontSize prop is no longer supported. Select renders at the body1 text size.
  <Select fontSize={2} />
  `,
  'warns on the unsupported fontSize prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Select radius={2} />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Select migration below. The radius prop is no longer supported. Select uses a fixed radius.
  <Select radius={2} />
  `,
  'warns on the unsupported radius prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Select gap={2} />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Select migration below. The gap prop is no longer supported. The spacing between the control and the icon is fixed.
  <Select gap={2} />
  `,
  'warns on the unsupported gap prop',
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
    expect(output).toContain(
      '// UI-CODEMOD TODO: Please double check the Select migration below. The radius prop is no longer supported. Select uses a fixed radius.',
    )
    expect(output).toContain('<RootSelect radius={2} />')
  },
  'transforms attributes on imported styled Select wrappers',
)
