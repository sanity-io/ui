import {CloseIcon} from '@sanity/icons/Close'
import {clsx} from 'clsx/lite'
import {useCallback, useEffect, useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'

import {ThemeColorSchemeKey} from '../../../theme/system/color/_system'
import {containsOrEqualsElement, isHTMLElement} from '../../helpers/element'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers/focus'
import {useClickOutsideEvent} from '../../hooks/useClickOutsideEvent'
import {useGlobalKeyDown} from '../../hooks/useGlobalKeyDown'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Box} from '../../primitives/box/box'
import {Button} from '../../primitives/button/button'
import {Card} from '../../primitives/card/card'
import {Container} from '../../primitives/container/container'
import {Flex} from '../../primitives/flex/flex'
import {Text} from '../../primitives/text/text'
import {ResponsivePaddingProps, ResponsiveWidthProps} from '../../primitives/types'
import {_getArrayProp} from '../../styles/helpers'
import {responsivePaddingStyle} from '../../styles/padding/paddingStyle'
import {ResponsivePaddingStyleProps} from '../../styles/padding/types'
import {useTheme_v2} from '../../theme/useTheme'
import {DialogPosition} from '../../types/dialog'
import {Radius} from '../../types/radius'
import {useBoundaryElement} from '../../utils/boundaryElement/useBoundaryElement'
import {Layer, LayerProps} from '../../utils/layer/layer'
import {useLayer} from '../../utils/layer/useLayer'
import {Portal} from '../../utils/portal/portal'
import {usePortal} from '../../utils/portal/usePortal'
import {
  dialogStyle,
  responsiveDialogPositionStyle,
  ResponsiveDialogPositionStyleProps,
} from './styles'
import {useDialog} from './useDialog'

import {
  dialogAnimated,
  dialogCard,
  dialogContainer,
  dialogContent,
  dialogFooter,
  dialogHeader,
  dialogLayer,
  dialogLayout,
} from './dialog.css'

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
  ref?: React.Ref<HTMLDivElement>
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
  ResponsiveDialogPositionStyleProps & ResponsivePaddingStyleProps
>(responsivePaddingStyle, dialogStyle, responsiveDialogPositionStyle)

function DialogCard(props: DialogCardProps) {
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
    ref: forwardedRef,
    scheme,
    shadow: shadowProp,
    width: widthProp,
  } = props
  const portal = usePortal()
  const portalElement = portalProp ? portal.elements?.[portalProp] || null : portal.element
  const boundaryElement = useBoundaryElement().element
  const radius = _getArrayProp(radiusProp)
  const shadow = _getArrayProp(shadowProp)
  const width = _getArrayProp(widthProp)
  const ref = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const layer = useLayer()
  const {isTopLayer} = layer
  const labelId = `${id}_label`
  // oxlint-disable-next-line no-unnecessary-boolean-literal-compare
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
        // oxlint-disable-next-line no-unsafe-type-assertion
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
    <Container className={dialogContainer} data-ui="DialogCard" display="flex" width={width}>
      <Card
        className={dialogCard}
        display="flex"
        radius={radius}
        ref={ref}
        scheme={scheme}
        shadow={shadow}
      >
        <Flex className={dialogLayout} direction="column" flex={1}>
          {showHeader && (
            <Box className={dialogHeader}>
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

          <Box className={dialogContent} flex={1} ref={contentRef} tabIndex={-1}>
            {children}
          </Box>

          {footer && <Box className={dialogFooter}>{footer}</Box>}
        </Flex>
      </Card>
    </Container>
  )
}

/**
 * The Dialog component.
 *
 * @public
 */
export function Dialog(
  props: DialogProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'id' | 'width'>,
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
    ref,
    scheme,
    width: widthProp = 0,
    zOffset: _zOffsetProp,
    animate: _animate = false,
    className,
    ...restProps
  } = props
  const positionProp = _positionProp ?? (dialog.position || 'fixed')
  const zOffsetProp = _zOffsetProp ?? (dialog.zOffset || layer.dialog.zOffset)
  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const portal = usePortal()
  const portalElement = portalProp ? portal.elements?.[portalProp] || null : portal.element
  const boundaryElement = useBoundaryElement().element
  const cardRadius = _getArrayProp(cardRadiusProp)
  const padding = _getArrayProp(paddingProp)
  const position = _getArrayProp(positionProp)
  const width = _getArrayProp(widthProp)
  const zOffset = _getArrayProp(zOffsetProp)
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
        $padding={padding}
        $position={position}
        aria-labelledby={labelId}
        className={clsx(dialogLayer, animate && dialogAnimated, className)}
        aria-modal
        data-ui="Dialog"
        id={id}
        onActivate={onActivate}
        onClick={handleRootClick}
        onFocus={handleFocus}
        ref={ref}
        // oxlint-disable-next-line prefer-tag-over-role
        role="dialog"
        zOffset={zOffset}
      >
        {/* oxlint-disable-next-line no-noninteractive-tabindex */}
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
        {/* oxlint-disable-next-line no-noninteractive-tabindex */}
        <div ref={postDivRef} tabIndex={0} />
      </StyledDialog>
    </Portal>
  )
}
