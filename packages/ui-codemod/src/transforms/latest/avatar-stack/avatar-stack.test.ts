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

defineInlineTest(
  transform,
  {},
  `
  <>
    <AvatarStack size={1} />
    <AvatarStack size={3} />
    <AvatarStack size={[1, 3]} />
  </>
  `,
  `
  <>
    <AvatarStack size={1} />
    // UI-CODEMOD TODO: Please double check the AvatarStack migration below. The size 3 is deprecated.
    <AvatarStack size={3} />
    // UI-CODEMOD TODO: Please double check the AvatarStack migration below. The size 3 is deprecated.
    <AvatarStack size={[1, 3]} />
  </>
  `,
  'warns for deprecated size prop',
)
