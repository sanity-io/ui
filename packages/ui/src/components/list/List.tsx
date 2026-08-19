import clsx from 'clsx'
import type {ComponentProps, ComponentPropsWithRef, ElementType} from 'react'

import type {ListTag} from '../../types/List'
import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {PressArea} from '../press-area/PressArea'
import {Text} from '../text/Text'
import {VStack} from '../v-stack/VStack'
import {
  listButtonItemProps,
  type ListButtonItemProps,
  type ListItemProps,
  listItemProps,
  type ListItemTextProps,
  listItemTextProps,
  type ListProps,
  listProps,
} from './list.props'

const listClassName = suffixClassName('sui-List')
const listItemClassName = suffixClassName('sui-ListItem')
const listButtonItemClassName = suffixClassName('sui-ListButtonItem')
const listItemTextClassName = suffixClassName('sui-ListItemText')
const listItemImageClassName = suffixClassName('sui-ListItemImage')

function ListRoot<T extends ListTag = 'ul'>(
  props: ListProps<T> & Omit<ComponentPropsWithRef<T>, keyof ListProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, listProps)
  const Component = as || 'ul'

  return (
    <VStack
      as={Component}
      className={clsx(listClassName, className)}
      style={style}
      data-ui="List"
      {...rest}
    >
      {children}
    </VStack>
  )
}

function ListItem({density = 'regular', ...props}: ListItemProps) {
  const {children, className, style, end, start, ...rest} = getProps(
    {density, ...props},
    listItemProps,
  )

  return (
    <li
      className={clsx(
        listItemClassName,
        'sui-width-full sui-display-flex sui-align-items-center',
        className,
      )}
      style={style}
      data-ui="ListItem"
      {...rest}
    >
      {start}

      <Flex flexGrow={1} gap="inherit">
        {children}
      </Flex>

      {end}
    </li>
  )
}

function ListButtonItem<T extends ElementType = 'button'>({
  density = 'regular',
  ...props
}: ListButtonItemProps<T> & Omit<ComponentPropsWithRef<T>, keyof ListButtonItemProps<T>>) {
  const {as, children, className, style, end, start, selected, ...rest} = getProps(
    {density, ...props},
    listButtonItemProps,
  )
  const Component = as || 'button'

  return (
    <li>
      <PressArea
        as={Component}
        className={clsx(
          listButtonItemClassName,
          'sui-width-full sui-display-flex sui-align-items-center sui-radius2',
          className,
        )}
        style={style}
        data-ui="ListButtonItem"
        data-selected={selected}
        {...rest}
      >
        {start}

        <Flex flexGrow={1} gap="inherit">
          {children}
        </Flex>

        {end}
      </PressArea>
    </li>
  )
}

function ListItemText<T extends ElementType = 'div'>(
  props: ListItemTextProps<T> & Omit<ComponentPropsWithRef<T>, keyof ListItemTextProps<T>>,
) {
  const {as, className, style, title, subtitle, ...rest} = getProps(props, listItemTextProps)
  const Component = as || 'div'

  return (
    <Flex
      as={Component}
      className={clsx(listItemTextClassName, className)}
      style={style}
      data-ui="ListItemText"
      flexDirection="column"
      justifyContent="center"
      gap={2}
      flexGrow={1}
      {...rest}
    >
      {title && (
        <Text size={1} weight="medium" trim truncate={1}>
          {title}
        </Text>
      )}

      {subtitle && (
        <Text size={1} muted trim truncate={1}>
          {subtitle}
        </Text>
      )}
    </Flex>
  )
}

function ListItemImage(props: ComponentProps<'img'>) {
  const {className, style, ...rest} = getProps(props, {})

  return (
    <img
      className={clsx(listItemImageClassName, 'sui-radius2', className)}
      style={style}
      data-ui="ListItemImage"
      {...rest}
    />
  )
}

ListRoot.displayName = 'List'

/** @beta */
export const List = ListRoot

ListRoot.Item = ListItem
ListRoot.ButtonItem = ListButtonItem
ListRoot.ItemText = ListItemText
ListRoot.ItemImage = ListItemImage

export type {ListProps, ListItemProps, ListButtonItemProps, ListItemTextProps}
