import {expect} from 'vitest'

import {defineInlineTest} from '../../../utils/testUtils'
import transform from './avatar'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Avatar} from '@legacy/ui'

  <Avatar />
  `,
  `
  import {Avatar} from "@sanity/ui"

  <Avatar />
  `,
  'updates Avatar import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Avatar __unstable_hideInnerStroke animateArrowFrom="top" arrowPosition="top" as="div" onImageLoadError={() => {}} />
  `,
  `
  <Avatar />
  `,
  'removes deprecated props',
)

defineInlineTest(
  transform,
  {},
  `
  <Avatar initials="AB" status="online" />
  `,
  `
  <Avatar name="AB" data-status="online" />
  `,
  'renames props',
)

defineInlineTest(
  transform,
  {},
  `
  <>
    <Avatar color="green" />
    <Avatar color="blue" />
  </>
  `,
  `
  <>
    <Avatar color="green" />
    // UI-CODEMOD TODO: Please double check the Avatar migration below. The color blue is deprecated.
    <Avatar color="blue" />
  </>
  `,
  'warns for deprecated color prop',
)

defineInlineTest(
  transform,
  {},
  `
  <>
    <Avatar size={1} />
    <Avatar size={3} />
    <Avatar size={[1, 3]} />
  </>
  `,
  `
  <>
    <Avatar size={1} />
    // UI-CODEMOD TODO: Please double check the Avatar migration below. The size 3 is deprecated.
    <Avatar size={3} />
    // UI-CODEMOD TODO: Please double check the Avatar migration below. The size 3 is deprecated.
    <Avatar size={[1, 3]} />
  </>
  `,
  'warns for deprecated size prop',
)
