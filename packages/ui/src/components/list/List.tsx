import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import type {ListTag} from '../../types/List'
import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {PressArea} from '../press-area/PressArea'
import {Text} from '../text/Text'
import {VStack} from '../v-stack/VStack'
import {
  listButtonProps,
  type ListItemButtonProps,
  type ListImageProps,
  type ListItemProps,
  type ListProps,
  listProps,
} from './list.props'

const listClassName = suffixClassName('sui-List')
const listItemClassName = suffixClassName('sui-ListItem')
const listButtonClassName = suffixClassName('sui-ListItemButton')
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

function ListItem({className, ...rest}: ListItemProps) {
  return (
    <li
      data-ui="ListItem"
      className={clsx(listItemClassName, 'sui-text-body1', className)}
      {...rest}
    />
  )
}

function ListItemButton<T extends ElementType = 'button'>({
  density = 'regular',
  ...props
}: ListItemButtonProps<T> & Omit<ComponentPropsWithRef<T>, keyof ListItemButtonProps<T>>) {
  const {as, children, className, style, text, subtext, end, start, selected, ...rest} = getProps(
    {density, ...props},
    listButtonProps,
  )
  const Component = as || 'button'

  return (
    <PressArea
      as={Component}
      className={clsx(
        listButtonClassName,
        'sui-width-full sui-display-flex sui-align-items-center sui-radius2',
        className,
      )}
      style={style}
      data-ui="ListItemButton"
      aria-pressed={selected}
      {...rest}
    >
      {start}

      <Flex flexDirection="column" justifyContent="center" gap={2} flexGrow={1}>
        {text && (
          <Text size={1} weight="medium" trim truncate={1}>
            {text}
          </Text>
        )}

        {subtext && (
          <Text size={1} muted trim truncate={1}>
            {subtext}
          </Text>
        )}

        {children}
      </Flex>

      {end}
    </PressArea>
  )
}

function ListItemImage({className, ...rest}: ListImageProps) {
  return (
    <img
      className={clsx(listItemImageClassName, 'sui-radius2', className)}
      data-ui="ListItemImage"
      {...rest}
    />
  )
}

ListRoot.displayName = 'List'

/** @beta */
export const List = Object.assign(ListRoot, {
  Item: ListItem,
  ItemButton: ListItemButton,
  ItemImage: ListItemImage,
})

export type {ListProps, ListItemProps, ListItemButtonProps, ListImageProps}
