import {defineInlineTest} from '../../utils/testUtils'
import transform from './heading'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Heading} from '@legacy/ui'

  <Heading />
  `,
  `
  import {Heading} from "@sanity/ui"

  <Heading trim={true} />
  `,
  'updates Heading import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading/>
  `,
  `
  <Heading trim={true} />
  `,
  'adds trim prop',
)
