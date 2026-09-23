import {FORM_ELEMENT_DENSITY, type FormElementDensity} from '../types/FormElement'
import type {PropDef} from '../types/PropDef'
import {paddingProps} from './padding'

/** @public */
export type FormElementDensityProps = {
  /**
   * Sets padding, gap, and other spacing values on the form element.
   */
  density?: FormElementDensity
}

export const formElementDensityProps: Record<string, PropDef> = {
  density: {
    type: 'composite',
    values: FORM_ELEMENT_DENSITY,
    composition: {
      paddingX: {
        propDef: paddingProps['paddingX'] as PropDef,
        mapping: {
          regular: 2,
          loose: 3,
        },
      },
      paddingY: {
        propDef: paddingProps['paddingY'] as PropDef,
        mapping: {
          regular: 1,
          loose: 2,
        },
      },
    },
  },
}
