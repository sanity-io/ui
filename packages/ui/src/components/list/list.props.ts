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
  /**
   * HTML element to render.
   */
  as?: T
}

export const listProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  gap: gapProps['gap'] as PropDef,
}

/** @beta */
export interface ListItemProps extends React.ComponentProps<'li'> {}

/** @beta */
export interface ListItemButtonProps<T extends React.ElementType = 'button'> extends ListItemProps {
  /**
   * Element or component to render for the press target.
   */
  as?: InteractiveAs<T>
  /**
   * Sets horizontal padding, gap, and minimum row height together.
   */
  density?: Responsive<Density>
  /**
   * Slot at the left edge of the row.
   */
  start?: React.ReactNode
  /**
   * Slot at the right edge of the row.
   */
  end?: React.ReactNode
  /**
   * Marks the row as the current selection.
   */
  selected?: boolean
  /**
   * Main label.
   */
  text?: React.ReactNode
  /**
   * Text below the title.
   */
  subtext?: React.ReactNode
}

export const listButtonProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  density: {
    type: 'composite',
    values: DENSITY,
    composition: {
      gap: {
        propDef: gapProps['gap'] as PropDef,
        mapping: {
          none: undefined,
          compact: 2,
          regular: 2,
          loose: 3,
        },
      },
      minHeight: {
        propDef: heightProps['minHeight'] as PropDef,
        mapping: {
          none: undefined,
          compact: '33px',
          regular: '37px',
          loose: '45px',
        },
      },
      paddingX: {
        propDef: paddingProps['padding'] as PropDef,
        mapping: {
          none: undefined,
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
  selected: {
    type: 'boolean',
  },
  text: {
    type: 'string',
  },
  subtext: {
    type: 'string',
  },
}

/** @beta */
export interface ListImageProps extends React.ComponentProps<'img'> {}
