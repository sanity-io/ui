import {CloseIcon} from '@sanity/icons'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {
  containsOrEqualsElement,
  focusFirstDescendant,
  focusLastDescendant,
  isHTMLElement,
} from '../../helpers'
import {useArrayProp, useClickOutside, useForwardedRef, useGlobalKeyDown} from '../../hooks'
import {Box, Button, Card, CardProps, Container, Flex, Text} from '../../primitives'
import {ResponsivePaddingProps, ResponsiveWidthProps} from '../../primitives/types'
import {responsivePaddingStyle, ResponsivePaddingStyleProps} from '../../styles/internal'
import {useTheme} from '../../theme'
import {DialogPosition, Radius} from '../../types'
import {Layer, LayerProps, Portal, useBoundaryElement, useLayer, usePortal} from '../../utils'
import {BORDER_OFFSET_X} from './constants'
import {
  animationDialogStyle,
  AnimationDialogStyleProps,
  dialogStyle,
  responsiveDialogPositionStyle,
  ResponsiveDialogPositionStyleProps,
} from './styles'
import {useDialog} from './useDialog'

/**
 * @public
 */
export interface DialogProps extends ResponsivePaddingProps, ResponsiveWidthProps {
  /**
   * @beta
   */
  __unstable_autoFocus?: boolean
  /**
   * @beta
   */
  __unstable_hideCloseButton?: boolean
  cardRadius?: Radius | Radius[]
  cardShadow?: number | number[]
  contentRef?: React.ForwardedRef<HTMLDivElement>
  footer?: React.ReactNode
  header?: React.ReactNode
  id: string
  /** A callback that fires when the dialog becomes the top layer when it was not the top layer before. */
  onActivate?: LayerProps['onActivate']
  onClickOutside?: () => void
  onClose?: () => void
  portal?: string
  position?: DialogPosition | DialogPosition[]
  scheme?: ThemeColorSchemeKey
  zOffset?: number | number[]
  /**
   * Whether the dialog should animate in on mount.
   *
   * @beta
   * @defaultValue false
   */
  animate?: boolean
}

interface DialogCardProps extends ResponsiveWidthProps {
  /**
   * @beta
   */
  __unstable_autoFocus: boolean
  /**
   * @beta
   */
  __unstable_hideCloseButton: boolean
  children: React.ReactNode
  contentRef?: React.ForwardedRef<HTMLDivElement>
  footer: React.ReactNode
  header: React.ReactNode
  id: string
  onClickOutside?: () => void
  onClose?: () => void
  portal?: string
  radius: Radius | Radius[]
  scheme?: ThemeColorSchemeKey
  shadow: number | number[]
}

interface DialogHeaderProps extends CardProps {
  $hasScrolledFromTop: boolean
  $isContentScrollable: boolean
}
interface DialogFooterProps extends CardProps {
  $hasScrolledToBottom: boolean
  $isContentScrollable: boolean
}

function isTargetWithinScope(
  boundaryElement: HTMLElement | null,
  portalElement: HTMLElement | null,
  target: Node,
): boolean {
  if (!boundaryElement || !portalElement) return true

  return (
    containsOrEqualsElement(boundaryElement, target) ||
    containsOrEqualsElement(portalElement, target)
  )
}

const Root = styled(Layer)<
  ResponsiveDialogPositionStyleProps & ResponsivePaddingStyleProps & AnimationDialogStyleProps
>(responsivePaddingStyle, dialogStyle, responsiveDialogPositionStyle, animationDialogStyle)

const DialogContainer = styled(Container)`
  &:not([hidden]) {
    display: flex;
  }
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DialogCardRoot = styled(Card)`
  &:not([hidden]) {
    display: flex;
  }
  width: 100%;
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
  overflow: clip;
`

const DialogLayout = styled(Flex)`
  flex: 1;
  min-height: 0;
  width: 100%;
`

const DialogHeader = styled(Box)<DialogHeaderProps>`
  position: relative;
  z-index: 2;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: ${BORDER_OFFSET_X}px;
    right: ${BORDER_OFFSET_X}px;
    bottom: -1px;
    border-bottom: 1px solid var(--card-border-color);
    width: auto;
    opacity: ${(props) => (props.$isContentScrollable && props.$hasScrolledFromTop ? 1 : 0)};
    transition: opacity 200ms ease-in;
  }
`

const DialogContent = styled(Box)`
  position: relative;
  z-index: 1;
  overflow: auto;
  outline: none;
`

const DialogFooter = styled(Box)<DialogFooterProps>`
  position: relative;
  z-index: 3;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: ${BORDER_OFFSET_X}px;
    right: ${BORDER_OFFSET_X}px;
    top: -1px;
    border-top: 1px solid var(--card-border-color);
    width: auto;
    opacity: ${(props) => (props.$isContentScrollable && !props.$hasScrolledToBottom ? 1 : 0)};
    transition: opacity 200ms ease-in;
  }
`

const DialogCard = forwardRef(function DialogCard(
  props: DialogCardProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    __unstable_autoFocus: autoFocus,
    __unstable_hideCloseButton: hideCloseButton,
    children,
    contentRef,
    footer,
    header,
    id,
    onClickOutside,
    onClose,
    portal: portalProp,
    radius: radiusProp,
    scheme,
    shadow: shadowProp,
    width: widthProp,
  } = props
  const portal = usePortal()
  const portalElement = portalProp ? portal.elements?.[portalProp] || null : portal.element
  const boundaryElement = useBoundaryElement().element
  const radius = useArrayProp(radiusProp)
  const shadow = useArrayProp(shadowProp)
  const width = useArrayProp(widthProp)
  const forwardedRef = useForwardedRef(ref)
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const localContentRef = useRef<HTMLDivElement | null>(null)
  const layer = useLayer()
  const {isTopLayer} = layer
  const labelId = `${id}_label`
  const showCloseButton = Boolean(onClose) && hideCloseButton === false
  const showHeader = Boolean(header) || showCloseButton
  const [isContentScrollable, setIsContentScrollable] = useState(false)
  const [hasScrolledFromTop, setHasScrolledFromTop] = useState(false)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)

  useEffect(() => {
    if (!autoFocus) return

    // On mount: focus the first focusable element
    if (forwardedRef.current) {
      focusFirstDescendant(forwardedRef.current)
    }
  }, [autoFocus, forwardedRef])

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

  useClickOutside(
    useCallback(
      (event: MouseEvent) => {
        if (!isTopLayer || !onClickOutside) return

        const target = event.target as Node | null

        if (target && !isTargetWithinScope(boundaryElement, portalElement, target)) {
          // Ignore clicks outside of the scope
          return
        }

        onClickOutside()
      },
      [boundaryElement, isTopLayer, onClickOutside, portalElement],
    ),
    [rootElement],
  )

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      setRootElement(el)
      forwardedRef.current = el
    },
    [forwardedRef],
  )

  const setContentRef = useCallback(
    (el: HTMLDivElement | null) => {
      localContentRef.current = el
      if (typeof contentRef === 'function') contentRef(el)
      else if (contentRef) contentRef.current = el
    },
    [contentRef],
  )

  const handleContentUpdate = useCallback(() => {
    if (localContentRef.current) {
      setIsContentScrollable(
        localContentRef.current.clientHeight < localContentRef.current.scrollHeight,
      )
      setHasScrolledFromTop(localContentRef.current.scrollTop > 0)
      setHasScrolledToBottom(
        localContentRef.current.scrollTop >=
          localContentRef.current.scrollHeight - localContentRef.current.clientHeight,
      )
    }
  }, [])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleContentUpdate)

    if (localContentRef.current) {
      resizeObserver.observe(localContentRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [contentRef, handleContentUpdate])

  return (
    <DialogContainer data-ui="DialogCard" width={width}>
      <DialogCardRoot radius={radius} ref={setRef} scheme={scheme} shadow={shadow}>
        <DialogLayout direction="column">
          {showHeader && (
            <DialogHeader
              $isContentScrollable={isContentScrollable}
              $hasScrolledFromTop={hasScrolledFromTop}
            >
              <Flex align="center">
                <Box flex={1} padding={4}>
                  {header && (
                    <Text id={labelId} size={1} weight="medium">
                      {header}
                    </Text>
                  )}
                </Box>
                {showCloseButton && (
                  <Box padding={2}>
                    <Button
                      aria-label="Close dialog"
                      disabled={!onClose}
                      icon={CloseIcon}
                      mode="bleed"
                      onClick={onClose}
                    />
                  </Box>
                )}
              </Flex>
            </DialogHeader>
          )}

          <DialogContent flex={1} ref={setContentRef} tabIndex={-1} onScroll={handleContentUpdate}>
            {children}
          </DialogContent>

          {footer && (
            <DialogFooter
              $isContentScrollable={isContentScrollable}
              $hasScrolledToBottom={hasScrolledToBottom}
            >
              {footer}
            </DialogFooter>
          )}
        </DialogLayout>
      </DialogCardRoot>
    </DialogContainer>
  )
})

/**
 * The Dialog component.
 *
 * @public
 */
export const Dialog = forwardRef(function Dialog(
  props: DialogProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'id' | 'width'>,
  ref: React.Ref<HTMLDivElement>,
) {
  const dialog = useDialog()
  const theme = useTheme()
  const {
    __unstable_autoFocus: autoFocus = true,
    __unstable_hideCloseButton: hideCloseButton = false,
    cardRadius: cardRadiusProp = 3,
    cardShadow = 4,
    children,
    contentRef,
    footer,
    header,
    id,
    onActivate,
    onClickOutside,
    onClose,
    onFocus,
    padding: paddingProp = 3,
    portal: portalProp,
    position: positionProp = dialog.position || 'fixed',
    scheme,
    width: widthProp = 0,
    zOffset: zOffsetProp = dialog.zOffset || theme.sanity.layer?.dialog.zOffset,
    animate = false,
    ...restProps
  } = props
  const portal = usePortal()
  const portalElement = portalProp ? portal.elements?.[portalProp] || null : portal.element
  const boundaryElement = useBoundaryElement().element
  const cardRadius = useArrayProp(cardRadiusProp)
  const padding = useArrayProp(paddingProp)
  const position = useArrayProp(positionProp)
  const width = useArrayProp(widthProp)
  const zOffset = useArrayProp(zOffsetProp)
  const preDivRef = useRef<HTMLDivElement | null>(null)
  const postDivRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const focusedElementRef = useRef<HTMLElement | null>(null)

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      onFocus?.(event)

      const target = event.target
      const cardElement = cardRef.current

      if (cardElement && target === preDivRef.current) {
        focusLastDescendant(cardElement)

        return
      }

      if (cardElement && target === postDivRef.current) {
        focusFirstDescendant(cardElement)

        return
      }

      if (isHTMLElement(event.target)) {
        focusedElementRef.current = event.target
      }
    },
    [onFocus],
  )

  const labelId = `${id}_label`

  const rootClickTimeoutRef = useRef<NodeJS.Timeout>()

  // If the resulting active element (a.k.a. focused element) is not withing scope when clicking
  // within the dialog, then we want to focus the previously interactive element in the dialog instead.
  // This is to allow the user to tab or close the dialog by pressing escape.
  const handleRootClick = useCallback(() => {
    if (rootClickTimeoutRef.current) {
      clearTimeout(rootClickTimeoutRef.current)
    }

    rootClickTimeoutRef.current = setTimeout(() => {
      const activeElement = document.activeElement

      if (activeElement && !isTargetWithinScope(boundaryElement, portalElement, activeElement)) {
        const target = focusedElementRef.current

        if (!target || !document.body.contains(target)) {
          // No previously focused element, or it's not in the document anymore
          const cardElement = cardRef.current
          if (cardElement) focusFirstDescendant(cardElement)

          return
        }

        target.focus()
      }
    }, 0)
  }, [boundaryElement, portalElement])

  return (
    <Portal __unstable_name={portalProp}>
      <Root
        {...restProps}
        $padding={padding}
        $position={position}
        aria-labelledby={labelId}
        aria-modal
        data-ui="Dialog"
        id={id}
        onActivate={onActivate}
        onClick={handleRootClick}
        onFocus={handleFocus}
        ref={ref}
        role="dialog"
        zOffset={zOffset}
        animate={animate}
      >
        <div ref={preDivRef} tabIndex={0} />
        <DialogCard
          __unstable_autoFocus={autoFocus}
          __unstable_hideCloseButton={hideCloseButton}
          contentRef={contentRef}
          footer={footer}
          header={header}
          id={id}
          onClickOutside={onClickOutside}
          onClose={onClose}
          portal={portalProp}
          radius={cardRadius}
          ref={cardRef}
          scheme={scheme}
          shadow={cardShadow}
          width={width}
        >
          {children}
        </DialogCard>
        <div ref={postDivRef} tabIndex={0} />
      </Root>
    </Portal>
  )
})
