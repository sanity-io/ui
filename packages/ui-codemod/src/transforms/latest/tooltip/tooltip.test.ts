import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
import transform from './tooltip'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Tooltip} from '@legacy/ui'

  <Tooltip />
  `,
  `
  import {Tooltip} from "@sanity/ui"

  <Tooltip />
  `,
  'updates Tooltip import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Tooltip, TooltipDelayGroupProvider} from '@legacy/ui'

  <TooltipDelayGroupProvider>
    <Tooltip />
  </TooltipDelayGroupProvider>
  `,
  `
  import {Tooltip, TooltipGroup} from "@sanity/ui"

  <TooltipGroup>
    <Tooltip />
  </TooltipGroup>
  `,
  'updates Tooltip and TooltipGroup imports path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <TooltipDelayGroupProvider delay={400}>
    <Tooltip
      allowedPlacements={['bottom']}
      animate
      arrow
      boundaryElement={ref}
      delay={100}
      fallbackPlacements={['bottom']}
      padding={1}
      radius={1}
      scheme="light"
      shadow={1}
      onActivate={() => {}}
      zOffset={1}
    />
  </TooltipDelayGroupProvider>
  `,
  `
  <TooltipGroup>
    <Tooltip />
  </TooltipGroup>
  `,
  'removes deprecated props',
)

defineInlineTest(
  transform,
  {},
  `
  <Tooltip disabled />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Tooltip migration below. The disabled prop has been deprecated in favor of conditional rendering.
  <Tooltip disabled />
  `,
  'warns if disabled prop is set',
)

defineInlineTest(
  transform,
  {},
  `
  <Tooltip content={<Box padding={2}><Text size={1}>Content</Text></Box>} />
  `,
  `
  // UI-CODEMOD TODO: Please double check the Tooltip migration below. Padding and font styling defaults have changed.
  <Tooltip content={<Box padding={2}><Text size={1}>Content</Text></Box>} />
  `,
  'warns for all content',
)

defineInlineTest(
  transform,
  {},
  `
  import {TooltipDelayGroupProvider} from '@sanity/ui'

  const RootTooltipGroup = styled(TooltipDelayGroupProvider)(({theme}) => ({}))
  `,
  `
  import {TooltipGroup} from '@sanity/ui'

  const RootTooltipGroup = styled(TooltipGroup)(({theme}) => ({}))
  `,
  'replaces TooltipGroup styled() base',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Tooltip} from '@sanity/ui'

    export const RootTooltip = styled(Tooltip)(({theme}) => ({}))
  `,
  `
    import {RootTooltip} from './Component.styled'

    export function Component() {
      return <RootTooltip animate />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootTooltip />')
  },
  'transforms attributes on imported styled Tooltip wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Tooltip} from '@sanity/ui'

    export const RootTooltip = styled(Tooltip)(({theme}) => ({}))
  `,
  `
    import {Tooltip} from 'another-package'
    import {RootTooltip} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootTooltip animate />
          <Tooltip animate />
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootTooltip />')
    expect(output).toContain('<Tooltip animate />')
  },
  'does not transform attributes on unrelated Tooltip from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Tooltip} from '@sanity/ui'

    export const RootTooltip = styled(Tooltip)(({theme}) => ({}))
  `,
  `
    import {RootTooltip} from './index'

    export function Component() {
      return <RootTooltip animate />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootTooltip />')
  },
  'transforms styled Tooltip wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootTooltip} from './Component.styled'`,
    },
  },
)
