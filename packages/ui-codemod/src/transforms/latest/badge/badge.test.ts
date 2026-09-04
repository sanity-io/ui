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
  <Badge radius={3}>Draft</Badge>
  `,
  `
  <Badge
    style={{
      borderRadius: "var(--radius-3)"
    }}
    as="div"
    text="Draft" />
  `,
  'moves radius prop to style and updates mapped value',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge radius="full">Draft</Badge>
  `,
  `
  <Badge
    style={{
      borderRadius: "var(--radius-round)"
    }}
    as="div"
    text="Draft" />
  `,
  'maps the full radius to the round radius variable',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge paddingX={2} paddingY={1}>Draft</Badge>
  `,
  `
  <Badge
    style={{
      paddingInline: "var(--space-2)",
      paddingBlock: "var(--space-1)"
    }}
    as="div"
    text="Draft" />
  `,
  'moves axis padding props to logical style properties',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge style={{color: 'red'}} paddingX={2}>Draft</Badge>
  `,
  `
  <Badge
    style={{
      color: 'red',
      paddingInline: "var(--space-2)"
    }}
    as="div"
    text="Draft" />
  `,
  'merges mapped props into an existing style prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge data-testid="status" tone="caution">Draft</Badge>
  `,
  `
  <Badge data-testid="status" tone="caution" as="div" text="Draft" />
  `,
  'leaves pass-through props such as data-testid alone',
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
  <Badge paddingX={24}>Draft</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below
  <Badge paddingX={24} as="div" text="Draft" />
  `,
  'warns on a space value outside the scale',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge paddingX={-1}>Draft</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below
  <Badge paddingX={-1} as="div" text="Draft" />
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
      return <RootBadge radius={3}>Draft</RootBadge>
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootBadge style={{ borderRadius: "var(--radius-3)" }} as="div" text="Draft" />',
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
          <RootBadge radius={3} />
          <Badge radius={3} />
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootBadge style={{ borderRadius: "var(--radius-3)" }} as="div" />',
    )
    expect(output).toContain('<Badge radius={3} />')
  },
  'does not transform attributes on unrelated Badge from another package',
)
