import {defineInlineTest} from '../../../utils/testUtils'
import transform from './radio'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Radio} from '@legacy/ui'

  <Radio />
  `,
  `
  import {Radio} from "@sanity/ui"

  <Radio />
  `,
  'updates Radio import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Radio customValidity="Required" />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Radio migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.
  <Radio customValidity="Required" />
  `,
  'warns on the unsupported customValidity prop',
)
