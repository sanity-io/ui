import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const AVATAR_STACK_MODS: AttributeMods = {
  size: {
    type: 'warn-only',
    when: {3: true},
    warning: 'Please double check the AvatarStack migration below. The size 3 is deprecated.',
  },
}
