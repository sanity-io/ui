import type React from 'react'

import {gapProps} from '../../props/gap'
import {paddingProps} from '../../props/padding'
import {DENSITY, type Density} from '../../types/Density'
import type {ListTag} from '../../types/List'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @beta */
export interface ListProps<T extends ListTag> {
  /** Element to render */
  as?: T
}

export const listProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}

/** @beta */
export interface ListItemProps extends React.ComponentProps<'li'> {
  /** Composite prop for setting padding and gap */
  density?: Responsive<Density>
  /** Trailing slot */
  trailing?: React.ReactNode
}

export const listItemProps: Record<string, PropDef> = {
  density: {
    type: 'composite',
    values: DENSITY,
    composition: {
      gap: {
        propDef: gapProps['gap'] as PropDef,
        mapping: {
          compact: 2,
          regular: 3,
          loose: 4,
        },
      },
      paddingX: {
        propDef: paddingProps['padding'] as PropDef,
        mapping: {
          compact: 2,
          regular: 3,
          loose: 4,
        },
      },
    },
  },
  trailing: {
    type: 'string',
  },
}

/** @beta */
export interface ListItemTextProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
  /** Title text */
  title?: React.ReactNode
  /** Subtitle text */
  subtitle?: React.ReactNode
}

export const listItemTextProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  title: {
    type: 'string',
  },
  subtitle: {
    type: 'string',
  },
}
