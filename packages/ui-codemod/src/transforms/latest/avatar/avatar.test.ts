import {expect} from 'vitest'

import {defineCrossFileTest, defineInlineTest} from '../../../utils/testUtils'
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

defineCrossFileTest(
  transform,
  {},
  `
    import {Avatar} from '@sanity/ui'

    export const RootAvatar = styled(Avatar)(({theme}) => ({}))
  `,
  `
    import {RootAvatar} from './Component.styled'

    export function RootAvatar() {
      return <RootAvatar initials="AB" />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootAvatar name="AB" />')
  },
  'transforms attributes on imported styled Avatar wrappers',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Avatar} from '@sanity/ui'

    export const RootAvatar = styled(Avatar)(({theme}) => ({}))
  `,
  `
    import {Avatar} from 'another-package'
    import {RootAvatar} from './Component.styled'

    export function Component() {
      return (
        <>
          <RootAvatar initials="AB" />
          <Avatar initials="AB" />
        </>
      )
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootAvatar name="AB" />')
    expect(output).toContain('<Avatar initials="AB" />')
  },
  'does not transform attributes on unrelated Avatar from another package',
)

defineCrossFileTest(
  transform,
  {},
  `
    import {Avatar} from '@sanity/ui'

    export const RootAvatar = styled(Avatar)(({theme}) => ({}))
  `,
  `
    import {RootAvatar} from './index'

    export function Component() {
      return <RootAvatar initials="AB" />
    }
  `,
  (output) => {
    expect(output.replace(/\s+/g, ' ')).toContain('<RootAvatar name="AB" />')
  },
  'transforms styled Avatar wrappers imported through barrel re-exports',
  {
    extraFiles: {
      'index.ts': `export {RootAvatar} from './Component.styled'`,
    },
  },
)
