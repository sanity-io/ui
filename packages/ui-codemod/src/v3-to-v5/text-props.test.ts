import {defineInlineTest} from '../utils/testUtils'
import transform from './text-props'

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
