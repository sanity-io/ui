import {defineInlineTest} from '../../../utils/testUtils'
import transform from './switch'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Switch} from '@legacy/ui'

  <Switch />
  `,
  `
  import {Switch} from "@sanity/ui"

  <Switch />
  `,
  'updates Switch import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Switch indeterminate />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Switch migration below. The indeterminate prop is no longer supported.
  <Switch indeterminate />
  `,
  'warns on the unsupported indeterminate prop',
)
