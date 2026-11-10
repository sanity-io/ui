import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const SWITCH_MODS: AttributeMods = {
  indeterminate: {
    type: 'warn-only',
    warning:
      'Please double check the Switch migration below. The indeterminate prop is no longer supported.',
  },
}
