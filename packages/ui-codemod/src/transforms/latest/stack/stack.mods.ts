import type {AttributeMods} from '../../../types/AttributeMods'

/** @internal */
export const STACK_MODS: AttributeMods = {
  sizing: {
    type: 'remove',
  },
  space: {
    type: 'rename-only',
    name: 'gap',
  },
}
