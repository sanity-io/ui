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
  <Badge tone="default" />
  `,
  `
  <Badge tone="neutral" as="div" />
  `,
  'maps the default tone to neutral',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge mode="outline" />
  `,
  `
  <Badge as="div" />
  `,
  'removes the deprecated mode prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge radius={3} />
  `,
  `
  <Badge
    style={{
      borderRadius: "var(--radius-3)"
    }}
    as="div" />
  `,
  'moves radius prop to style and updates mapped value',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge radius="full" />
  `,
  `
  <Badge
    style={{
      borderRadius: "var(--radius-round)"
    }}
    as="div" />
  `,
  'maps the full radius to the round radius variable',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge paddingX={2} paddingY={1} />
  `,
  `
  <Badge style={{
    paddingInline: "var(--space-2)",
    paddingBlock: "var(--space-1)"
  }} as="div" />
  `,
  'moves axis padding props to logical style properties',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge style={{color: 'red'}} paddingX={2} />
  `,
  `
  <Badge style={{
    color: 'red',
    paddingInline: "var(--space-2)"
  }} as="div" />
  `,
  'merges mapped props into an existing style prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge data-testid="status" tone="caution" />
  `,
  `
  <Badge data-testid="status" tone="caution" as="div" />
  `,
  'leaves pass-through props such as data-testid alone',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge {...rest} radius={2} tone="primary" />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below
  <Badge
    {...rest}
    tone="primary"
    style={{
      borderRadius: "var(--radius-2)"
    }}
    as="div" />
  `,
  'preserves a spread attribute',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge tone="primary" />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below
  <Badge tone="primary" as="div" />
  `,
  'warns on the unsupported primary tone',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge fontSize={0} />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below. The fontSize prop is no longer supported. Badge renders its text prop at size 1.
  <Badge fontSize={0} as="div" />
  `,
  'warns on the unsupported fontSize prop',
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
  'warns when the Badge has children',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge fontSize={1} mode="outline" paddingX={2} paddingY={1} radius={4} tone={badge.color ? BADGE_TONES[badge.color] : undefined} style={{whiteSpace: 'nowrap'}}>{badge.label}</Badge>
  `,
  `
  // UI-CODEMOD TODO: Please double check the Badge migration below. Move the children into the text prop.
  // UI-CODEMOD TODO: Please double check the Badge migration below. The fontSize prop is no longer supported. Badge renders its text prop at size 1.
  <Badge
    fontSize={1}
    tone={badge.color ? BADGE_TONES[badge.color] : undefined}
    style={{
      whiteSpace: 'nowrap',
      paddingInline: "var(--space-2)",
      paddingBlock: "var(--space-1)",
      borderRadius: "var(--radius-4)"
    }}
    as="div">{badge.label}</Badge>
  `,
  'transforms a Badge that combines mapped props, an existing style, and a dynamic tone',
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
      return <RootBadge radius={3} />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain(
      '<RootBadge style={{ borderRadius: "var(--radius-3)" }} as="div" />',
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
