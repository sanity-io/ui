import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const TOOLTIP_MODS: AttributeMods = {
  allowedPlacements: {
    type: 'remove',
  },
  animate: {
    type: 'remove',
  },
  arrow: {
    type: 'remove',
  },
  boundaryElement: {
    type: 'remove',
  },
  content: {
    type: 'warn-only',
    warning:
      'Please double check the Tooltip migration below. Padding and font styling defaults have changed.',
  },
  delay: {
    type: 'remove',
  },
  disabled: {
    type: 'warn-only',
    warning:
      'Please double check the Tooltip migration below. The disabled prop has been deprecated in favor of conditional rendering.',
  },
  fallbackPlacements: {
    type: 'remove',
  },
  padding: {
    type: 'remove',
  },
  radius: {
    type: 'remove',
  },
  scheme: {
    type: 'remove',
  },
  shadow: {
    type: 'remove',
  },
  onActivate: {
    type: 'remove',
  },
  zOffset: {
    type: 'remove',
  },
}
