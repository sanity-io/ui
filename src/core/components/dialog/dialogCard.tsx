import {CloseIcon} from '@sanity/icons'
import {
  dialogCardRoot,
  dialogContent,
  dialogFooter,
  dialogHeader,
  dialogLayout,
} from '@sanity/ui/css'
import {
  type ForwardedRef,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

import {focusFirstDescendant} from '../../helpers'
import {useClickOutsideEvent, useGlobalKeyDown} from '../../hooks'
import {
  Box,
  Button,
  Card,
  type CardElementType,
  type CardOwnProps,
  Flex,
  Text,
} from '../../primitives'
import type {Props} from '../../types'
import {useBoundaryElement, useLayer, usePortal} from '../../utils'
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
) {
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

  return (
    <Card {...rest} as={as} className={dialogCardRoot()} display="flex" ref={ref}>
      <Flex className={dialogLayout()} direction="column" flex={1}>
        {showHeader && (
          <Box className={dialogHeader()} position="relative">
            <Flex align="flex-start" padding={3}>
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
          </Box>
        )}
        <Box
          className={dialogContent()}
          flex={1}
          overflow="auto"
          position="relative"
          ref={contentRef}
          tabIndex={-1}
        >
          {children}
        </Box>
        {footer && (
          <Box className={dialogFooter()} position="relative">
            {footer}
          </Box>
        )}
      </Flex>
    </Card>
  )
}

DialogCard.displayName = 'DialogCard'
