import {defineInlineTest} from '../../../utils/testUtils'
import transform from './hotkeys'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Hotkeys} from '@legacy/ui'

  <Hotkeys />
  `,
  `
  import {Hotkeys} from "@sanity/ui"

  <Hotkeys />
  `,
  'updates Hotkeys import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Hotkeys} from '@legacy/ui'

  <Hotkeys fontSize={1} padding={1} radius={1} gap={1} space={1} />
  `,
  `
  import {Hotkeys} from "@sanity/ui"

  <Hotkeys />
  `,
  'removes deprecated props',
)
