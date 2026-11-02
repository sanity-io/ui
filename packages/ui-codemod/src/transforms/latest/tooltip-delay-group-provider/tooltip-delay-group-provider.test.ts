import {defineInlineTest} from '../../../utils/testUtils'
import transform from './tooltip-delay-group-provider'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {TooltipDelayGroupProvider} from '@legacy/ui'

  <TooltipDelayGroupProvider />
  `,
  `
  import {TooltipGroup} from "@sanity/ui"

  <TooltipGroup />
  `,
  'updates TooltipDelayGroupProvider import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <TooltipDelayGroupProvider delay={400} />
  `,
  `
  <TooltipGroup />
  `,
  'removes deprecated props',
)
