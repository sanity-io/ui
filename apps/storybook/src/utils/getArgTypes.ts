import type {ArgTypes} from '@storybook/react-vite'

import type {PropDef} from '../../../../packages/ui/src/types/PropDef'

export function getArgTypes<T extends Record<string, PropDef>, P>(propDefs?: T) {
  if (!propDefs) {
    return {}
  }

  return Object.entries(propDefs).reduce<Record<string, unknown>>((obj, [key, value]) => {
    obj[key] = {
      type: value.type,
      ...(value.type === 'union' && {
        options: value.values,
        control: {type: 'select'},
      }),
      ...(value.type === 'composite' && {
        options: value.values,
        control: {type: 'select'},
      }),
    }

    return obj
  }, {}) as ArgTypes<P>
}
