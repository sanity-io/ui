import {defineInlineTest} from '../utils/testUtils'
import transform, { TODO_WARNING } from './heading-props'

defineInlineTest(
  transform,
  {},
  `
  <Heading flex={1} />
  `,
  `
  <Heading
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
  <Heading width={0} maxWidth="fill" />
  `,
  `
  <Heading style={{
    width: "20rem",
    maxWidth: "100%"
  }} trim={true} />
  `,
  'moves width props to style and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading textOverflow="ellipsis" />
  `,
  `
  <Heading lineClamp={1} trim={true} />
  `,
  'renames textOverflow prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading maxWidth={[0, 1, 2]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Heading maxWidth={[0, 1, 2]} trim={true} />
  `,
  'warns if responsive maxWidth prop should be moved to style',
)
