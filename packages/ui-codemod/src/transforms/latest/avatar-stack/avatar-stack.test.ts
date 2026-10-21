import {expect} from 'vitest'

import {defineInlineTest} from '../../../utils/testUtils'
import transform from './avatar-stack'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {AvatarStack} from '@legacy/ui'

  <AvatarStack />
  `,
  `
  import {AvatarStack} from "@sanity/ui"

  <AvatarStack />
  `,
  'updates AvatarStack import path based on fromPackage and toPackage',
)
