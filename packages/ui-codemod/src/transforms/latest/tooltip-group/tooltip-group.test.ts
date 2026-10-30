import {expect} from 'vitest'

import {defineInlineTest} from '../../../utils/testUtils'
import transform from './tooltip-group'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {TooltipGroup} from '@legacy/ui'

  <TooltipGroup />
  `,
  `
  import {TooltipGroup} from "@sanity/ui"

  <TooltipGroup />
  `,
  'updates TooltipGroup import path based on fromPackage and toPackage',
)
