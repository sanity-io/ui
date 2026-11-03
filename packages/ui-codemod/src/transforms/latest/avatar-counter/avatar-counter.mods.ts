import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const AVATAR_COUNTER_MODS: AttributeMods = {
  size: {
    type: 'warn-only',
    when: {3: true},
    warning: 'Please double check the AvatarCounter migration below. The size 3 is deprecated.',
  },
}
