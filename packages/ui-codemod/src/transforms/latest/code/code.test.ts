import {defineInlineTest} from '../../../utils/testUtils'
import transform from './code'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Code} from '@legacy/ui'

  <Code />
  `,
  `
  import {Code} from "@sanity/ui"

  <Code trim={true} />
  `,
  'updates Code import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Code />
  `,
  `
  <Code trim={true} />
  `,
  'adds trim prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Code flex="auto" />
  `,
  `
  <Code
    style={{
      flex: "1 1 auto"
    }}
    trim={true} />
  `,
  'moves flex prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Code width={1} maxWidth="fill" />
  `,
  `
  <Code style={{
    width: "40rem",
    maxWidth: "100%"
  }} trim={true} />
  `,
  'moves width props to style and uppdates mapped values',
)
