import React, {forwardRef, useCallback, useState} from 'react'
import styled from 'styled-components'
import {Inline} from '../../primitives'

interface TabListProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  children: React.ReactElement[]
  space?: number | number[]
}

const Root = styled.div``

export const TabList = forwardRef((props: TabListProps & React.HTMLProps<HTMLDivElement>, ref) => {
  const {children, space, ...restProps} = props
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const numTabs = children.length

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

  const tabs = children.map((child, childIndex) => {
    return React.cloneElement(child, {
      focused: focusedIndex === childIndex,
      key: childIndex,
      onFocus: () => handleTabFocus(childIndex),
    })
  })

  return (
    <Root data-ui="TabList" {...restProps} onKeyDown={handleKeyDown} ref={ref} role="tablist">
      <Inline space={space}>{tabs}</Inline>
    </Root>
  )
})

TabList.displayName = 'TabList'
