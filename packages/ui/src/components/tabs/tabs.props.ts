import type {LayoutProps} from '../../props/layout'
import {toneProps, type ToneProps} from '../../props/tone'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface TabsProps extends React.ComponentProps<'div'> {
  /** The value of the active tab */
  value: string
  onValueChange: (value: string) => void
}

export const tabsProps: Record<string, PropDef> = {
  value: {
    type: 'string',
  },
}

// Tabs.List requires either aria-label or aria-labelledby
type TabsListLabelProps =
  | {'aria-labelledby': string; 'aria-label'?: never}
  | {'aria-label': string; 'aria-labelledby'?: never}

/** @public */
export type TabsListProps = Omit<React.ComponentProps<'div'>, 'id' | 'role'> & TabsListLabelProps

export const tabsListProps: Record<string, PropDef> = {}

/** @public */
export interface TabProps
  extends
    Omit<React.ComponentProps<'button'>, 'aria-disabled' | 'disabled' | 'id' | 'role'>,
    ToneProps {
  /**
   * Shows an icon before the label.
   */
  icon?: React.ElementType | React.ReactNode
  label: string
  value: string
}

export const tabProps: Record<string, PropDef> = {
  icon: {
    type: 'string',
  },
  label: {
    type: 'string',
  },
  value: {
    type: 'string',
  },
  ...toneProps,
}

/** @public */
export interface TabsPanelProps
  extends Omit<React.ComponentProps<'div'>, 'id' | 'role'>, LayoutProps {
  value: string
}

export const tabsPanelProps: Record<string, PropDef> = {
  value: {
    type: 'string',
  },
}
