import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const SPINNER_MODS: AttributeMods = {
  muted: {
    type: 'style-mapped',
    style: 'color',
    mapping: {
      true: 'var(--foreground-low)',
    },
  },
}
