import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const RADIO_MODS: AttributeMods = {
  customValidity: {
    type: 'warn-only',
    warning:
      'Please double check the Radio migration below. The customValidity prop is no longer supported. Radio validation should occur at the field level.',
  },
}
