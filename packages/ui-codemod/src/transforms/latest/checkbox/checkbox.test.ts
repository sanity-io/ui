import {defineInlineTest} from '../../../utils/testUtils'
import transform from './checkbox'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Checkbox} from '@legacy/ui'

  <Checkbox />
  `,
  `
  import {Checkbox} from "@sanity/ui"

  <Checkbox />
  `,
  'updates Checkbox import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Checkbox customValidity="Required" />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Checkbox migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.
  <Checkbox customValidity="Required" />
  `,
  'warns on the unsupported customValidity prop',
)
