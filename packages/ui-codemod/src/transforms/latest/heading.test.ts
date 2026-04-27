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

defineInlineTest(
  transform,
  {},
  `
  <Heading flex="auto" />
  `,
  `
  <Heading
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
  <Heading width={1} maxWidth="fill" />
  `,
  `
  <Heading width="40rem" maxWidth="100%" trim={true} />
  `,
  'updates width prop mapped values',
)
