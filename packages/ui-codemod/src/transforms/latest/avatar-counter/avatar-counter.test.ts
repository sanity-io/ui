import {defineInlineTest} from '../../../utils/testUtils'
import transform from './avatar-counter'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {AvatarCounter} from '@legacy/ui'

  <AvatarCounter />
  `,
  `
  import {AvatarCounter} from "@sanity/ui"

  <AvatarCounter />
  `,
  'updates AvatarCounter import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <>
    <AvatarCounter size={1} />
    <AvatarCounter size={3} />
    <AvatarCounter size={[1, 3]} />
  </>
  `,
  `
  <>
    <AvatarCounter size={1} />
    // UI-CODEMOD TODO: Please double check the AvatarCounter migration below. The size 3 is deprecated.
    <AvatarCounter size={3} />
    // UI-CODEMOD TODO: Please double check the AvatarCounter migration below. The size 3 is deprecated.
    <AvatarCounter size={[1, 3]} />
  </>
  `,
  'warns for deprecated size prop',
)
