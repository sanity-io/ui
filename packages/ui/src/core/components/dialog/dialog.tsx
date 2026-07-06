import {CloseIcon} from '@sanity/icons'
import {ThemeColorSchemeKey} from '@sanity/ui/theme'
import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'

import {
  containsOrEqualsElement,
  focusFirstDescendant,
  focusLastDescendant,
  isHTMLElement,
} from '../../helpers'
import {
  useArrayProp,
  useClickOutsideEvent,
  useGlobalKeyDown,
  usePrefersReducedMotion,
} from '../../hooks'
import {Box, Button, Card, Container, Flex, Text} from '../../primitives'
import {ResponsivePaddingProps, ResponsiveWidthProps} from '../../primitives/types'
import {responsivePaddingStyle, ResponsivePaddingStyleProps} from '../../styles/internal'
import {useTheme_v2} from '../../theme'
import {DialogPosition, Radius} from '../../types'
import {Layer, LayerProps, Portal, useBoundaryElement, useLayer, usePortal} from '../../utils'
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

const StyledDialog = styled(Layer)<
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

const DialogHeader = styled(Box)`
  position: relative;
  z-index: 2;
`

const DialogContent = styled(Box)`
  position: relative;
  z-index: 1;
  overflow: auto;
  outline: none;
`

const DialogFooter = styled(Box)`
  position: relative;
  z-index: 3;
`

const DialogCard = forwardRef(function DialogCard(
  props: DialogCardProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    __unstable_autoFocus: autoFocus,
    __unstable_hideCloseButton: hideCloseButton,
    children,
    contentRef: forwardedContentRef,
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
    <DialogContainer data-ui="DialogCard" width={width}>
      <DialogCardRoot radius={radius} ref={ref} scheme={scheme} shadow={shadow}>
        <DialogLayout direction="column">
          {showHeader && (
            <DialogHeader>
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
            </DialogHeader>
          )}

          <DialogContent flex={1} ref={contentRef} tabIndex={-1}>
            {children}
          </DialogContent>

          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogLayout>
      </DialogCardRoot>
    </DialogContainer>
  )
})

DialogCard.displayName = 'ForwardRef(DialogCard)'

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
  const {layer} = useTheme_v2()
  const {
    __unstable_autoFocus: autoFocus = true,
    __unstable_hideCloseButton: hideCloseButton = false,
    cardRadius: cardRadiusProp = 4,
    cardShadow = 3,
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
    position: _positionProp,
    scheme,
    width: widthProp = 0,
    zOffset: _zOffsetProp,
    animate: _animate = false,
    ...restProps
  } = props
  const positionProp = _positionProp ?? (dialog.position || 'fixed')
  const zOffsetProp = _zOffsetProp ?? (dialog.zOffset || layer.dialog.zOffset)
  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
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

  const rootClickTimeoutRef = useRef<NodeJS.Timeout>(undefined)

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
      <StyledDialog
        {...restProps}
        $animate={animate}
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
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
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
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div ref={postDivRef} tabIndex={0} />
      </StyledDialog>
    </Portal>
  )
})
Dialog.displayName = 'ForwardRef(Dialog)'
