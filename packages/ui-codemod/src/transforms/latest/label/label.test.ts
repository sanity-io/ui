import {defineInlineTest} from '../../../utils/testUtils'
import transform from './label'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Label} from '@legacy/ui'

  <Label />
  `,
  `
  import {Eyebrow} from "@sanity/ui"

  <Eyebrow as="div" trim={true} />
  `,
  'updates Eyebrow import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Label />
  `,
  `
  <Eyebrow as="div" trim={true} />
  `,
  'adds trim prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Label />
  `,
  `
  <Eyebrow as="div" trim={true} />
  `,
  'adds as prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Label as="span" />
  `,
  `
  <Eyebrow as="span" trim={true} />
  `,
  'does not add as prop if already set',
)

defineInlineTest(
  transform,
  {},
  `
  <Label flex="auto" />
  `,
  `
  <Eyebrow
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
  <Label accent />
  `,
  `
  <Eyebrow tone="suggest" as="div" trim={true} />
  `,
  'renames accent prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Label textOverflow="ellipsis" />
  `,
  `
  <Eyebrow lineClamp={1} as="div" trim={true} />
  `,
  'renames textOverflow prop and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Label width={1} maxWidth="fill" />
  `,
  `
  <Eyebrow
    style={{
      width: "40rem",
      maxWidth: "100%"
    }}
    as="div"
    trim={true} />
  `,
  'moves width props to style and updates mapped value',
)

defineInlineTest(
  transform,
  {},
  `
  <label htmlFor="inputId" />
  `,
  `
  <label htmlFor="inputId" />
  `,
  'preserves label HTML elements',
)
