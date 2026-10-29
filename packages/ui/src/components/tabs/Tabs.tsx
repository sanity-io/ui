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

function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
  // Ignore keydowns if made with alt, ctrl, or meta
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return
  }

  const tabsList = event.currentTarget
  const focusedTab = event.target
  const tabs = Array.from(tabsList.querySelectorAll<HTMLElement>('[role="tab"]'))
  const focusedTabIndex = tabs.indexOf(focusedTab as HTMLElement)

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    const previousTab = tabs[(focusedTabIndex - 1 + tabs.length) % tabs.length]
    previousTab?.focus()
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    const nextTab = tabs[(focusedTabIndex + 1) % tabs.length]
    nextTab?.focus()
  }
  if (event.key === 'Home') {
    event.preventDefault()
    tabs[0]?.focus()
  }
  if (event.key === 'End') {
    event.preventDefault()
    tabs[tabs.length - 1]?.focus()
  }
}

function TabsList(props: TabsListProps) {
  const {children, className, style, ...rest} = getProps(props, tabsListProps)

  return (
    <HStack
      {...rest}
      role="tablist"
      className={className}
      style={style}
      data-ui="Tabs.List"
      gap={1}
      onKeyDown={handleKeyDown}
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
      /* Only the active tab should receive focus via Tab key; others focus via arrow keys */
      tabIndex={selected ? 0 : -1}
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
      // Default tabIndex for panels without focusable content — consumer overrides if their panel content is focusable
      tabIndex={0}
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
