import {marginProps} from '../../props/margin'
import {type PaddingProps, paddingProps} from '../../props/padding'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'
import {SPACE, type SpaceInherit} from '../../types/Space'

/** @deprecated Use HStack component instead */
/** @public */
export interface InlineProps<T extends React.ElementType = 'div'> extends PaddingProps {
  /**
   * HTML element or component to render.
   */
  as?: T
  /**
   * Space between children.
   */
  gap?: Responsive<SpaceInherit>
}

export const inlineProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  gap: {
    type: 'composite',
    values: SPACE,
    composition: {
      marginTop: {
        propDef: marginProps['marginTop'] as PropDef,
        mapping: {
          0: 0,
          1: -1,
          2: -2,
          3: -3,
          4: -4,
          5: -5,
          6: -6,
          7: -7,
          8: -8,
          9: -9,
        },
      },
      marginLeft: {
        propDef: marginProps['marginLeft'] as PropDef,
        mapping: {
          0: 0,
          1: -1,
          2: -2,
          3: -3,
          4: -4,
          5: -5,
          6: -6,
          7: -7,
          8: -8,
          9: -9,
        },
      },
    },
  },
  ...paddingProps,
}

export const inlineChildrenProps: Record<string, PropDef> = {
  gap: {
    type: 'composite',
    values: SPACE,
    composition: {
      paddingTop: {
        propDef: paddingProps['paddingTop'] as PropDef,
        mapping: {
          0: 0,
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
        },
      },
      paddingLeft: {
        propDef: paddingProps['paddingLeft'] as PropDef,
        mapping: {
          0: 0,
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9,
        },
      },
    },
  },
}
