import {Children, cloneElement, forwardRef, isValidElement, useCallback, useState} from 'react'
import {styled} from 'styled-components'

import {Inline, InlineProps} from '../../primitives'

/**
 * @public
 */
export interface TabListProps extends Omit<InlineProps, 'as' | 'height'> {
  children: Array<React.JSX.Element | null | undefined | false>
}

//Limits the width of tabs in tablist
const CustomInline = styled(Inline)`
  & > div {
    display: inline-block;
    vertical-align: middle;
    max-width: 100%;
    box-sizing: border-box;
  }
`

/**
 * @public
 */
export const TabList = forwardRef(function TabList(
  props: TabListProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref,
) {
  const {children: childrenProp, ...restProps} = props
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const children: React.JSX.Element[] = Children.toArray(childrenProp).filter(isValidElement)

  const tabs = children.map((child, childIndex) =>
    cloneElement(child, {
      focused: focusedIndex === childIndex,
      key: childIndex,
      onFocus: () => setFocusedIndex(childIndex),
    }),
  )

  const numTabs = tabs.length

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        setFocusedIndex((prevIndex) => (prevIndex + numTabs - 1) % numTabs)
      }

      if (event.key === 'ArrowRight') {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % numTabs)
      }
    },
    [numTabs],
  )

  return (
    <CustomInline
      data-ui="TabList"
      {...restProps}
      onKeyDown={handleKeyDown}
      ref={ref}
      role="tablist"
    >
      {tabs}
    </CustomInline>
  )
})
TabList.displayName = 'ForwardRef(TabList)'
