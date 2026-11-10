import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const CHECKBOX_MODS: AttributeMods = {
  customValidity: {
    type: 'warn-only',
    warning:
      'Please double check the Checkbox migration below. The customValidity prop is no longer supported. Handle validation externally and pass hasError to toggle the invalid styling.',
  },
}
