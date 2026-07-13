import {type PlacementProps, placementProps} from '../../props/placement'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface TooltipProps extends React.ComponentProps<'div'>, PlacementProps {
  /** Tooltip text */
  text?: React.ReactNode
  /** Disabled state */
  disabled?: boolean
}

export const tooltipProps: Record<string, PropDef> = {
  text: {
    type: 'string',
  },
  disabled: {
    type: 'boolean',
  },
  ...placementProps,
}


export interface TooltipSubcomponentRootProps {
  /** Disabled state */
  disabled?: boolean
  /** Tooltip id */
  id?: string
  children?: React.ReactNode
}

export const tooltipSubcomponentRootProps: Record<string, PropDef> = {
  disabled: {
    type: 'boolean',
  },
  id: {
    type: 'string',
  },
}

export interface TooltipTriggerProps<T extends React.ElementType> {
  /** Element to render */
  as?: T
}

export const tooltipTriggerProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}

export interface TooltipContentProps extends React.ComponentProps<'div'>, PlacementProps {
  /** Tooltip text */
  text?: React.ReactNode
}

export const tooltipContentProps: Record<string, PropDef> = {
  text: {
    type: 'string',
  },
  ...placementProps,
}

