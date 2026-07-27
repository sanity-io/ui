import {defineInlineTest} from '../../../utils/testUtils'
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

  <Text as="div" trim={true} />
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
  <Text as="div" trim={true} />
  `,
  'adds trim prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Text />
  `,
  `
  <Text as="div" trim={true} />
  `,
  'adds as prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Text as="span" />
  `,
  `
  <Text as="span" trim={true} />
  `,
  'does not add as prop if already set',
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
    as="div"
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
  <Text tone="suggest" as="div" trim={true} />
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
  <Text truncate={1} as="div" trim={true} />
  `,
  'renames textOverflow prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Text width={1} maxWidth="fill" />
  `,
  `
  <Text
    style={{
      width: "40rem",
      maxWidth: "100%"
    }}
    as="div"
    trim={true} />
  `,
  'moves width props to style and updates mapped value',
)
