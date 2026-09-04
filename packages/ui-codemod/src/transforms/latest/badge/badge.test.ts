import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './badge'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Badge} from '@legacy/ui'

  <Badge />
  `,
  `
  import {Badge} from "@sanity/ui"

  <Badge as="div" />
  `,
  'updates Badge import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge />
  `,
  `
  <Badge as="div" />
  `,
  'adds as prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge as="span">Draft</Badge>
  `,
  `
  <Badge as="span" text="Draft" />
  `,
  'does not add as prop if already set',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge tone="positive">Published</Badge>
  `,
  `
  <Badge tone="positive" as="div" text="Published" />
  `,
  'moves a simple text child to the text prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge>
    Draft
  </Badge>
  `,
  `
  <Badge as="div" text="Draft" />
  `,
  'trims surrounding whitespace when moving a text child',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge>{'Draft'}</Badge>
  `,
  `
  <Badge as="div" text="Draft" />
  `,
  'moves a string literal child to the text prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge tone="default">Draft</Badge>
  `,
  `
  <Badge tone="neutral" as="div" text="Draft" />
  `,
  'maps the default tone to neutral',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge mode="outline">Draft</Badge>
  `,
  `
  <Badge as="div" text="Draft" />
  `,
  'removes the deprecated mode prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge padding={2} radius={3} margin={1}>Draft</Badge>
  `,
  `
  <Badge
    style={{
      padding: "var(--space-2)",
      borderRadius: "var(--radius-3)",
      margin: "var(--space-1)"
    }}
    as="div"
    text="Draft" />
  `,
  'moves padding, radius, and margin props to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge paddingX={2} paddingY={1} marginX={3} marginY={4}>Draft</Badge>
  `,
  `
  <Badge
    style={{
      paddingInline: "var(--space-2)",
      paddingBlock: "var(--space-1)",
      marginInline: "var(--space-3)",
      marginBlock: "var(--space-4)"
    }}
    as="div"
    text="Draft" />
  `,
  'moves axis padding and margin props to logical style properties',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge radius="full" flex="auto" sizing="border">Draft</Badge>
  `,
  `
  <Badge
    style={{
      borderRadius: "var(--radius-round)",
      flex: "1 1 auto",
      boxSizing: "border-box"
    }}
    as="div"
    text="Draft" />
  `,
  'moves radius, flex, and sizing props to style and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge tone="critical">{label}</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below. Move the children into the text prop.
  <Badge tone="critical" as="div">{label}</Badge>
  `,
  'leaves a dynamic child alone and adds a warning',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge><Icon /></Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below. Move the children into the text prop.
  <Badge as="div"><Icon /></Badge>
  `,
  'leaves an element child alone and adds a warning',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge text="Draft">Draft</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below. Move the children into the text prop.
  <Badge text="Draft" as="div">Draft</Badge>
  `,
  'does not overwrite an existing text prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge tone="primary">Beta</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below
  <Badge tone="primary" as="div" text="Beta" />
  `,
  'warns on the unsupported primary tone',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge fontSize={2}>Draft</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below. The fontSize prop is no longer supported. Badge renders its text prop at size 1.
  <Badge fontSize={2} as="div" text="Draft" />
  `,
  'warns on the unsupported fontSize prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge margin={24}>Draft</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below
  <Badge margin={24} as="div" text="Draft" />
  `,
  'warns on a space value outside the scale',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge margin={-1}>Draft</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below
  <Badge margin={-1} as="div" text="Draft" />
  `,
  'warns on a negative space value',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Badge} from '@sanity/ui'

    export const RootBadge = styled(Badge)(({theme}) => ({}))
  `,
  `
    import {RootBadge} from './Component.styled'

    export function Component() {
      return <RootBadge padding={2}>Draft</RootBadge>
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootBadge style={{ padding: "var(--space-2)" }} as="div" text="Draft" />',
    )
  },
  'transforms attributes on imported styled Badge wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Badge} from '@sanity/ui'

    export const RootBadge = styled(Badge)(({theme}) => ({}))
  `,
  `
    import {Badge} from 'another-package'
    import {RootBadge} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootBadge padding={2} />
          <Badge padding={2} />
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootBadge style={{ padding: "var(--space-2)" }} as="div" />',
    )
    expect(output).toContain('<Badge padding={2} />')
  },
  'does not transform attributes on unrelated Badge from another package',
)
