import {CloseIcon} from '@sanity/icons'
import {
  dialogCard,
  dialogContent,
  dialogFooter,
  dialogHeader,
  dialogScroller,
  dialogScrollerShadowBottom,
  dialogScrollerShadowTop,
} from '@sanity/ui/css'
import {
  type ForwardedRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {focusFirstDescendant} from '../../helpers/focus'
import {useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {useGlobalKeyDown} from '../../hooks/useGlobalKeyDown'
import {Box} from '../../primitives/box/box'
import {Button} from '../../primitives/button/button'
import {Card, type CardElementType, type CardOwnProps} from '../../primitives/card/card'
import {Flex} from '../../primitives/flex/flex'
import {useLayer} from '../../primitives/layer/useLayer'
import {Text} from '../../primitives/text/text'
import type {Props} from '../../types/props'
import {useBoundaryElement} from '../../utils/boundaryElement/useBoundaryElement'
import {usePortal} from '../../utils/portal/usePortal'
import {isTargetWithinScope} from './isTargetWithinScope'

/** @internal */
export const DEFAULT_DIALOG_CARD_ELEMENT = 'div'

/** @internal */
export type DialogCardOwnProps = CardOwnProps & {
  /**
   * @beta
   */
  __unstable_autoFocus: boolean
  /**
   * @beta
   */
  __unstable_hideCloseButton: boolean
  children: ReactNode
  contentRef?: ForwardedRef<HTMLDivElement>
  footer: ReactNode
  header: ReactNode
  id: string
  onClickOutside?: () => void
  onClose?: () => void
  portal?: string
}

/** @internal */
export type DialogCardElementType = CardElementType

/** @internal */
export type DialogCardProps<E extends DialogCardElementType = DialogCardElementType> = Props<
  DialogCardOwnProps,
  E
>

/** @internal */

export function DialogCard<E extends DialogCardElementType = typeof DEFAULT_DIALOG_CARD_ELEMENT>(
  props: DialogCardProps<E>,
): React.JSX.Element {
  const {
    __unstable_autoFocus: autoFocus,
    __unstable_hideCloseButton: hideCloseButton,
    as = DEFAULT_DIALOG_CARD_ELEMENT,
    children,
    contentRef: forwardedContentRef,
    footer,
    header,
    id,
    onClickOutside,
    onClose,
    portal: portalProp,
    ref: forwardedRef,
    ...rest
  } = props as DialogCardProps<typeof DEFAULT_DIALOG_CARD_ELEMENT>

  const portal = usePortal()
  const portalElement = portalProp ? portal.elements?.[portalProp] || null : portal.element
  const boundaryElement = useBoundaryElement().element
  const ref = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const layer = useLayer()
  const {isTopLayer} = layer
  const labelId = `${id}_label`
  const showCloseButton = Boolean(onClose) && hideCloseButton === false
  const showHeader = Boolean(header) || showCloseButton
  const [scrollTop, setScrollTop] = useState(0)
  const [scrollHeight, setScrollHeight] = useState(0)
  const scrollBottom = scrollHeight - scrollTop

  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
    forwardedContentRef,
    () => contentRef.current,
  )

  useEffect(() => {
    if (!autoFocus) return

    // On mount: focus the first focusable element
    if (ref.current) {
      focusFirstDescendant(ref.current)
    }
  }, [autoFocus, ref])

  useGlobalKeyDown(
    useCallback(
      (event: KeyboardEvent) => {
        if (!isTopLayer || !onClose) return

        const target = document.activeElement

        if (target && !isTargetWithinScope(boundaryElement, portalElement, target)) {
          // Ignore key presses when the focused element is outside of scope
          return
        }

        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          onClose()
        }
      },
      [boundaryElement, isTopLayer, onClose, portalElement],
    ),
  )

  useClickOutsideEvent(
    isTopLayer &&
      onClickOutside &&
      ((event) => {
        const target = event.target as Node | null

        if (target && !isTargetWithinScope(boundaryElement, portalElement, target)) {
          // Ignore clicks outside of the scope
          return
        }

        onClickOutside()
      }),
    () => [ref.current],
  )

  useEffect(() => {
    const el = contentRef.current

    if (!el) return

    const handleScroll = () => {
      setScrollTop(el.scrollTop)
      setScrollHeight(el.scrollHeight - el.offsetHeight)
    }

    el.addEventListener('scroll', handleScroll, {passive: true})

    return () => {
      el.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Card
      {...rest}
      as={as}
      className={dialogCard()}
      display="flex"
      flexDirection="column"
      ref={ref}
    >
      {showHeader && (
        <Flex align="flex-start" className={dialogHeader()} padding={3} position="relative">
          <Box flex={1} padding={2}>
            {header && (
              <Text id={labelId} size={1} weight="semibold">
                {header}
              </Text>
            )}
          </Box>

          {showCloseButton && (
            <Box flex="none">
              <Button
                aria-label="Close dialog"
                disabled={!onClose}
                icon={CloseIcon}
                mode="bleed"
                onClick={onClose}
                padding={2}
              />
            </Box>
          )}
        </Flex>
      )}

      <Box className={dialogContent()} flex={1} position="relative" tabIndex={-1}>
        {showHeader && (
          <div
            className={dialogScrollerShadowTop()}
            style={{opacity: Math.min(scrollTop, 32) / 32}}
          />
        )}

        <Box className={dialogScroller()} overflow="auto" ref={contentRef}>
          {children}
        </Box>

        {footer && (
          <div
            className={dialogScrollerShadowBottom()}
            style={{opacity: Math.min(scrollBottom, 32) / 32}}
          />
        )}
      </Box>

      {footer && (
        <Box className={dialogFooter()} position="relative">
          {footer}
        </Box>
      )}
    </Card>
  )
}
