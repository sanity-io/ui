import {defineInlineTest} from '../utils/testUtils'
import transform, { TODO_WARNING } from './heading-props'

defineInlineTest(
  transform,
  {},
  `
  <Heading as="h1" flex={1} />
  `,
  `
  <Heading
    as="h1"
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
  <Heading as="h1" />
  `,
  `
  <Heading as="h1" trim={true} />
  `,
  'adds trim prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading as="h1" width={0} maxWidth="fill" />
  `,
  `
  <Heading as="h1" style={{
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
  <Heading as="h1" textOverflow="ellipsis" />
  `,
  `
  <Heading as="h1" lineClamp={1} trim={true} />
  `,
  'renames textOverflow prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading as="h1" maxWidth={[0, 1, 2]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Heading as="h1" maxWidth={[0, 1, 2]} trim={true} />
  `,
  'warns if responsive maxWidth prop should be moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Heading />
  `,
  `
  // TODO: Codemod migrated Heading component but "as" is required
  <Heading trim={true} />
  `,
  'warns if as props is missing',
)
