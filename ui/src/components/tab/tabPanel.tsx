import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {flexItemStyle, ResponsiveFlexItemStyleProps} from '../../styles/flex'

interface TabPanelProps extends ResponsiveFlexItemStyleProps {
  /**
   * The `id` of the correlating `Tab` component.
   */
  'aria-labelledby': string
  as?: React.ElementType | keyof JSX.IntrinsicElements
  id: string
}

const Root = styled.div<ResponsiveFlexItemStyleProps>(flexItemStyle)

export const TabPanel = forwardRef(
  (props: TabPanelProps & Omit<React.HTMLProps<HTMLDivElement>, 'id' | 'role'>, ref) => {
    return (
      <Root
        data-ui="TabPanel"
        {...props}
        ref={ref}
        role="tabpanel"
        tabIndex={props.tabIndex === undefined ? 0 : props.tabIndex}
      >
        {props.children}
      </Root>
    )
  }
)

TabPanel.displayName = 'TabPanel'
