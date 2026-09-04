import {clsx} from 'clsx/lite'
import {Children, cloneElement, isValidElement, useCallback, useState} from 'react'

import {Inline, InlineOwnProps} from '../../primitives/inline/inline'

import {tabList} from './tabList.css'

/**
 * @public
 */
export interface TabListProps extends Omit<InlineOwnProps, 'height'> {
  children: Array<React.JSX.Element | null | undefined | false>
}

/**
 * @public
 */
export function TabList(
  props: TabListProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
) {
  const {children: childrenProp, className, ref, ...restProps} = props
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
    <Inline
      className={clsx(tabList, className)}
      data-ui="TabList"
      {...restProps}
      onKeyDown={handleKeyDown}
      ref={ref}
      role="tablist"
    >
      {tabs}
    </Inline>
  )
}
