import {
  button,
  button_loadingBox,
  BUTTON_STYLE_PROP_KEYS,
  type ButtonStyleProps,
  type ResponsiveProp,
} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'
import {isValidElement} from 'react'
import {isValidElementType} from 'react-is'

import {_splitKeys} from '../../_keys'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box/Box'
import {Spinner} from '../spinner/Spinner'
import {Text, type TextOwnProps} from '../text/Text'
import {Tooltip, type TooltipProps} from '../tooltip/Tooltip'

/** @public */
export const DEFAULT_BUTTON_ELEMENT = 'button'

/** @public */
export interface ButtonOwnProps extends ButtonStyleProps {
  'data-ui'?: string
  'fontSize'?: ResponsiveProp<FontTextSize>
  'icon'?: React.ElementType | React.ReactNode
  'iconRight'?: React.ElementType | React.ReactNode
  /** @beta Do not use in production, as this might change.*/
  'loading'?: boolean
  'muted'?: boolean
  'selected'?: boolean
  'textAlign'?: TextOwnProps['align']
  'text'?: React.ReactNode
  'textOverflow'?: TextOwnProps['textOverflow']
  'textWeight'?: TextOwnProps['weight']
  'tooltip'?: Omit<TooltipProps<'div'>, 'as' | 'children'>
}

/** @public */
export type ButtonElementType = 'a' | 'button' | 'label' | ComponentType

/** @public */
export type ButtonProps<E extends ButtonElementType = ButtonElementType> = Props<ButtonOwnProps, E>

/** @public */
export function Button<E extends ButtonElementType = typeof DEFAULT_BUTTON_ELEMENT>(
  props: ButtonProps<E>,
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_BUTTON_ELEMENT,
      children,
      disabled,
      fontSize = 1,
      icon: IconComponent,
      iconRight: IconRightComponent,
      loading,
      muted,
      selected,
      text,
      textAlign,
      textOverflow = 'ellipsis',
      textWeight = 'medium',
      tooltip,
      type = 'button',
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as ButtonProps<typeof DEFAULT_BUTTON_ELEMENT>, BUTTON_STYLE_PROP_KEYS)

  let href: string | undefined = undefined

  if ('href' in domProps) {
    href = typeof domProps.href === 'string' ? domProps.href : href
    delete domProps.href
  }

  const node = (
    <Element
      data-ui="Button"
      {...domProps}
      className={button(styleProps)}
      data-disabled={loading || disabled ? '' : props['data-disabled']}
      data-selected={selected ? '' : props['data-selected']}
      disabled={Boolean(loading || disabled)}
      // WORKAROUND: Since `a` elements don't support the `disabled` prop,
      // we need to remove the `href` prop from the DOM props when the button is disabled.
      // @ts-expect-error - the default element is a `button` and does not have the `href` prop
      href={disabled ? undefined : href}
      type={type}
    >
      {Boolean(loading) && (
        <Box
          alignItems="center"
          as="span"
          className={button_loadingBox()}
          display="flex"
          flex={1}
          justifyContent="center"
          width="fill"
        >
          <Spinner size={fontSize} />
        </Box>
      )}

      {IconComponent && (
        <Text as="span" flex="none" muted size={fontSize}>
          {isValidElement(IconComponent) && IconComponent}
          {isValidElementType(IconComponent) && <IconComponent />}
        </Text>
      )}

      {text && (
        <Box as="span" maxWidth="auto">
          <Text
            align={textAlign}
            as="span"
            muted={muted}
            size={fontSize}
            textOverflow={textOverflow}
            weight={textWeight}
          >
            {text}
          </Text>
        </Box>
      )}

      {children}

      {IconRightComponent && (
        <Text as="span" flex="none" muted size={fontSize}>
          {isValidElement(IconRightComponent) && IconRightComponent}
          {isValidElementType(IconRightComponent) && <IconRightComponent />}
        </Text>
      )}
    </Element>
  )

  if (tooltip) {
    return <Tooltip {...tooltip}>{node}</Tooltip>
  }

  return node
}
