import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const AVATAR_MODS: AttributeMods = {
  __unstable_hideInnerStroke: {
    type: 'remove',
  },
  animateArrowFrom: {
    type: 'remove',
  },
  arrowPosition: {
    type: 'remove',
  },
  as: {
    type: 'remove',
  },
  color: {
    type: 'warn-only',
    when: {blue: true},
    warning: 'Please double check the Avatar migration below. The color blue is deprecated.',
  },
  initials: {
    type: 'rename-only',
    name: 'name',
  },
  onImageLoadError: {
    type: 'remove',
  },
  size: {
    type: 'warn-only',
    when: {3: true},
    warning: 'Please double check the Avatar migration below. The size 3 is deprecated.',
  },
  status: {
    type: 'rename-only',
    name: 'data-status',
  },
}
