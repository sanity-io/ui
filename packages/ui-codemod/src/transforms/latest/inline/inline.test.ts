import {defineInlineTest} from '../../../utils/testUtils'
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
  // UI-POC-CODEMOD TODO: Please double check the Inline migration below. Margin is not supported in either version.
  <Inline margin={2} />
  `,
  'warns if margin prop is present',
)
