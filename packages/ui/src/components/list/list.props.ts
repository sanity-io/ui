import type React from 'react'

import {type GapProps, gapProps} from '../../props/gap'
import {heightProps} from '../../props/height'
import {paddingProps} from '../../props/padding'
import {DENSITY, type Density} from '../../types/Density'
import type {InteractiveAs} from '../../types/Interactive'
import type {ListTag} from '../../types/List'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @beta */
export interface ListProps<T extends ListTag = 'ul'> extends Pick<GapProps, 'gap'> {
  /** Element to render */
  as?: T
}

export const listProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  gap: gapProps['gap'] as PropDef,
}

/** @beta */
export interface ListItemProps extends React.ComponentProps<'li'> {
  /** Composite prop for setting padding and gap */
  density?: Responsive<Density>
  /** Starting slot */
  start?: React.ReactNode
  /** Ending slot */
  end?: React.ReactNode
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
          regular: 2,
          loose: 3,
        },
      },
      minHeight: {
        propDef: heightProps['minHeight'] as PropDef,
        mapping: {
          compact: '33px',
          regular: '37px',
          loose: '45px',
        },
      },
      paddingX: {
        propDef: paddingProps['padding'] as PropDef,
        mapping: {
          compact: 1,
          regular: 2,
          loose: 3,
        },
      },
    },
  },
  end: {
    type: 'string',
  },
  start: {
    type: 'string',
  },
}

/** @beta */
export interface ListButtonItemProps<T extends React.ElementType = 'button'> extends ListItemProps {
  /** Element to render */
  as?: InteractiveAs<T>
  /** Selected state */
  selected?: boolean
}

export const listButtonItemProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  selected: {
    type: 'boolean',
  },
  ...listItemProps,
}

/** @beta */
export interface ListItemTextProps<T extends React.ElementType = 'div'> {
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
