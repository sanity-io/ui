import React, {cloneElement, forwardRef, useCallback, useState} from 'react'
import {Inline, InlineProps} from '../../primitives'

/**
 * @public
 */
export interface TabListProps extends Omit<InlineProps, 'as' | 'height'> {
  children: React.ReactElement[]
}

/**
 * @public
 */
export const TabList = forwardRef(
  (props: TabListProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>, ref) => {
    const {children, ...restProps} = props
    const [focusedIndex, setFocusedIndex] = useState(-1)

    const tabs = children.map((child, childIndex) =>
      cloneElement(child, {
        focused: focusedIndex === childIndex,
        key: childIndex,
        onFocus: () => handleTabFocus(childIndex),
      })
    )

    const numTabs = tabs.length

    const handleTabFocus = useCallback((tabIdx: number) => {
      setFocusedIndex(tabIdx)
    }, [])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          setFocusedIndex((prevIndex) => (prevIndex + numTabs - 1) % numTabs)
        }

        if (event.key === 'ArrowRight') {
          setFocusedIndex((prevIndex) => (prevIndex + 1) % numTabs)
        }
      },
      [numTabs]
    )

    return (
      <Inline data-ui="TabList" {...restProps} onKeyDown={handleKeyDown} ref={ref} role="tablist">
        {tabs}
      </Inline>
    )
  }
)

TabList.displayName = 'TabList'
