import {defineInlineTest} from '../utils/testUtils'
import transform, { TODO_WARNING } from './text-props'

defineInlineTest(
  transform,
  {},
  `
  <Text flex={1} />
  `,
  `
  <Text
    style={{
      flex: 1
    }}
    trim={true} />
  `,
  'moves flex prop to style',
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
  <Text maxWidth="fill" />
  `,
  `
  <Text
    style={{
      maxWidth: "100%"
    }}
    trim={true} />
  `,
  'moves maxWidth prop to style and updates mapped values',
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
  <Text maxWidth={[0, 1, 2]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Text maxWidth={[0, 1, 2]} trim={true} />
  `,
  'warns if responsive maxWidth prop should be moved to style',
)
