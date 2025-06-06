import {
  type ContainerStyleProps,
  dialog,
  dialogContainer,
  type ResponsiveProp,
} from '@sanity/ui/css'
import type {Radius, ThemeColorSchemeKey} from '@sanity/ui/theme'
import {type FocusEvent, type ForwardedRef, type ReactNode, useCallback, useRef} from 'react'

import {Z_OFFSETS} from '../../constants'
import {isHTMLElement} from '../../helpers/element'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers/focus'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import type {CardTone} from '../../primitives/card/types'
import {Container} from '../../primitives/container/container'
import {Layer, type LayerOwnProps, type LayerProps} from '../../primitives/layer/layer'
import type {ComponentType, Props} from '../../types/props'
import {useBoundaryElement} from '../../utils/boundaryElement/useBoundaryElement'
import {Portal} from '../../utils/portal/portal'
import {usePortal} from '../../utils/portal/usePortal'
import {DialogCard} from './dialogCard'
import {isTargetWithinScope} from './isTargetWithinScope'
import type {DialogPosition} from './types'
import {useDialog} from './useDialog'

/** @public */
export const DEFAULT_DIALOG_ELEMENT = 'div'

/** @public */
export type DialogOwnProps = ContainerStyleProps &
  Omit<LayerOwnProps, 'width'> & {
    /**
     * @beta
     */
    __unstable_autoFocus?: boolean
    /**
     * @beta
     */
    __unstable_hideCloseButton?: boolean
    /**
     * Whether the dialog should animate in on mount.
     *
     * @beta
     * @defaultValue false
     */
    animate?: boolean
    cardRadius?: ResponsiveProp<Radius>
    contentRef?: ForwardedRef<HTMLDivElement>
    footer?: ReactNode
    header?: ReactNode
    id: string
    /** A callback that fires when the dialog becomes the top layer when it was not the top layer before. */
    onActivate?: LayerProps['onActivate']
    onClickOutside?: () => void
    onClose?: () => void
    open?: boolean
    portal?: string
    position?: ResponsiveProp<DialogPosition>
    scheme?: ThemeColorSchemeKey
    tone?: CardTone
    zOffset?: number | number[]
  }

/** @public */
export type DialogElementType = 'div' | 'span' | ComponentType

/** @public */
export type DialogProps<E extends DialogElementType = DialogElementType> = Props<DialogOwnProps, E>

/**
 * The Dialog component.
 *
 * @public
 */
export function Dialog<E extends DialogElementType = typeof DEFAULT_DIALOG_ELEMENT>(
  props: DialogProps<E>,
) {
  const context = useDialog()
  const {
    __unstable_autoFocus: autoFocus = true,
    __unstable_hideCloseButton: hideCloseButton = false,
    animate: _animate = false,
    cardRadius: cardRadiusProp = 4,
    children,
    className,
    contentRef,
    footer,
    header,
    id,
    onActivate,
    onClickOutside,
    onClose,
    onFocus,
    padding = 3,
    portal: portalProp,
    position: _positionProp,
    scheme,
    shadow: cardShadow = 4,
    width = 0,
    zOffset: _zOffsetProp,
    tone,
    ...rest
  } = props as DialogProps<typeof DEFAULT_DIALOG_ELEMENT>

  const positionProp = _positionProp ?? context.position ?? 'fixed'
  const zOffsetProp = _zOffsetProp ?? context.zOffset ?? Z_OFFSETS.dialog
  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const portal = usePortal()
  const portalElement = portalProp ? portal.elements?.[portalProp] || null : portal.element
  const boundaryElement = useBoundaryElement().element
  const cardRadius = useResponsiveProp(cardRadiusProp)
  const position = useResponsiveProp(positionProp)
  const zOffset = useResponsiveProp(zOffsetProp)
  const preDivRef = useRef<HTMLDivElement | null>(null)
  const postDivRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const focusedElementRef = useRef<HTMLElement | null>(null)

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
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
      <Layer
        {...rest}
        aria-labelledby={labelId}
        aria-modal
        className={dialog({className})}
        data-animate={animate ? '' : undefined}
        data-ui="Dialog"
        display="flex"
        id={id}
        onActivate={onActivate}
        onClick={handleRootClick}
        onFocus={handleFocus}
        padding={padding}
        position={position}
        role="dialog"
        zOffset={zOffset}
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div ref={preDivRef} tabIndex={0} />
        <Container
          alignItems="center"
          className={dialogContainer()}
          data-ui="DialogCard"
          flexDirection="column"
          display="flex"
          justifyContent="center"
          width={width}
        >
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
            tone={tone}
            width={width}
          >
            {children}
          </DialogCard>
        </Container>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div ref={postDivRef} tabIndex={0} />
      </Layer>
    </Portal>
  )
}
