import {defineInlineTest} from '../../utils/testUtils'
import transform from './text'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Text} from '@legacy/ui'

  <Text />
  `,
  `
  import {Text} from "@sanity/ui"

  <Text trim={true} />
  `,
  'updates Text import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Text />
  `,
  `
  <Text trim={true} />
  `,
  'adds trim prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Text flex="auto" />
  `,
  `
  <Text
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
  <Text accent />
  `,
  `
  <Text tone="suggest" trim={true} />
  `,
  'renames accent prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Text textOverflow="ellipsis" />
  `,
  `
  <Text lineClamp={1} trim={true} />
  `,
  'renames textOverflow prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Text maxWidth="fill" />
  `,
  `
  <Text maxWidth="100%" trim={true} />
  `,
  'updates maxWidth prop mapped value',
)
