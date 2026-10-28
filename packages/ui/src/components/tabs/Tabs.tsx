import clsx from 'clsx'
import {createContext, useContext} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {HStack} from '../h-stack/HStack'
import {
  tabProps,
  type TabProps,
  tabsListProps,
  type TabsListProps,
  tabsPanelProps,
  type TabsPanelProps,
  type TabsProps,
  tabsProps,
} from './tabs.props'

const tabsClassName = suffixClassName('sui-Tabs')

const TabsContext = createContext<{
  value: string
  onValueChange: (value: string) => void
} | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.[subcomponents] must be rendered inside the Tabs component')
  return context
}

function TabsRoot({value, onValueChange, ...props}: TabsProps) {
  const {children, className, style, ...rest} = getProps(props, tabsProps)

  return (
    <TabsContext.Provider value={{value, onValueChange}}>
      <div className={clsx(tabsClassName, className)} style={style} data-ui="Tabs" {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList(props: TabsListProps) {
  const {children, className, style, ...rest} = getProps(props, tabsListProps)

  return (
    <HStack
      role="tablist"
      className={className}
      style={style}
      data-ui="Tabs.List"
      gap={1}
      {...rest}
    >
      {children}
    </HStack>
  )
}

const tabClasses = clsx('sui-px2', 'sui-py1', 'sui-radius2', 'sui-text-body1', 'sui-weight-medium')

function Tab({value, tone = 'neutral', ...props}: TabProps) {
  const {label, className, style, ...rest} = getProps({tone, ...props}, tabProps)

  const context = useTabsContext()
  const selected = context.value === value

  return (
    <button
      className={clsx(tabClasses, className)}
      style={style}
      {...rest}
      id={`${value}-tab`}
      type="button"
      role="tab"
      aria-controls={`${value}-panel`}
      aria-selected={selected}
      onClick={(e) => {
        props.onClick?.(e)
        context.onValueChange?.(value)
      }}
    >
      {label}
    </button>
  )
}

function TabPanel({value, ...props}: TabsPanelProps) {
  const {children, className, style, ...rest} = getProps(props, tabsPanelProps)

  const context = useTabsContext()
  const selected = context.value === value

  return (
    <Box
      className={className}
      style={style}
      {...rest}
      display={selected ? 'block' : 'none'}
      role="tabpanel"
      id={`${value}-panel`}
      aria-labelledby={`${value}-tab`}
    >
      {children}
    </Box>
  )
}

TabsRoot.displayName = 'Tabs'

/** @public */
export const Tabs = TabsRoot

TabsRoot.List = TabsList
TabsRoot.Tab = Tab
TabsRoot.Panel = TabPanel

export type {TabsProps}
export type {TabsListProps}
export type {TabProps}
