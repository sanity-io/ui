import {defineInlineTest} from '../../utils/testUtils'
import transform from './text-props'

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
  <Text/>
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
  <Text textOverflow="ellipsis" />
  `,
  `
  <Text lineClamp={1} trim={true} />
  `,
  'renames textOverflow prop and updates mapped values',
)
