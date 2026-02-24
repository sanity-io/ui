import {
  type ContainerStyleProps,
  dialog,
  dialogContainer,
  type ResponsiveProp,
} from '@sanity/ui/css'
import type {CardTone, ColorScheme, Radius} from '@sanity/ui/theme'
import {
  type FocusEvent,
  type ForwardedRef,
  type ReactNode,
  use,
  useCallback,
  useMemo,
  useRef,
} from 'react'

import {Z_OFFSETS} from '../../constants'
import {isHTMLElement} from '../../helpers/element'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers/focus'
import {_getResponsiveProp} from '../../helpers/props'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Container} from '../../primitives/container/Container'
import {Layer, type LayerOwnProps, type LayerProps} from '../../primitives/layer/Layer'
import type {ComponentType, Props} from '../../types'
import {BoundaryElementContext} from '../../utils/boundaryElement/BoundaryElementContext'
import {Portal} from '../../utils/portal/Portal'
import {usePortal} from '../../utils/portal/usePortal'
import {DialogCard} from './DialogCard'
import {isTargetWithinScope} from './isTargetWithinScope'
import type {DialogPosition} from './types'
import {useDialog} from './useDialog'

/**
 * The default HTML element type rendered by the {@link Dialog} component.
 *
 * @public
 */
export const DEFAULT_DIALOG_ELEMENT = 'div'

/**
 * Own props for the {@link Dialog} component.
 *
 * @remarks
 * Extends {@link ContainerStyleProps} and {@link LayerOwnProps} (with `width` omitted)
 * to combine container width control with layer stacking capabilities.
 *
 * @public
 */
export type DialogOwnProps = ContainerStyleProps &
  Omit<LayerOwnProps, 'width'> & {
    /**
     * When `true`, the dialog automatically moves focus to its first focusable
     * descendant on mount. When `false`, the dialog does not manage initial focus.
     *
     * @beta Do not use in production.
     *
     * @defaultValue true
     */
    __unstable_autoFocus?: boolean

    /**
     * When `true`, hides the close button in the dialog header.
     *
     * @beta Do not use in production.
     *
     * @defaultValue false
     */
    __unstable_hideCloseButton?: boolean

    /**
     * When `true`, the dialog animates into view on mount.
     *
     * @remarks
     * Animation is automatically disabled when the user's operating system
     * indicates a preference for reduced motion (`prefers-reduced-motion: reduce`).
     *
     * @beta
     *
     * @defaultValue false
     */
    animate?: boolean

    /**
     * Sets the border radius of the dialog card.
     *
     * @remarks
     * Uses the radius scale defined by the theme. Supports responsive values.
     *
     * @defaultValue 4
     */
    cardRadius?: ResponsiveProp<Radius>

    /**
     * A ref forwarded to the dialog's scrollable content container element.
     *
     * @remarks
     * Provides a reference to the inner `<div>` that wraps the dialog's
     * children content. Useful for controlling scroll position programmatically.
     */
    contentRef?: ForwardedRef<HTMLDivElement>

    /**
     * Content rendered in the footer area of the dialog, below the main content.
     *
     * @remarks
     * When provided, the footer is rendered inside the dialog card at the bottom.
     * Typically used for action buttons (e.g. "Save", "Cancel").
     */
    footer?: ReactNode

    /**
     * Content rendered in the header area of the dialog.
     *
     * @remarks
     * When provided, a header bar is rendered at the top of the dialog card.
     * Typically a string title, but accepts any React node. The header also
     * receives a close button unless `__unstable_hideCloseButton` is `true`.
     *
     * The `id` prop is used to generate an `aria-labelledby` association
     * between the dialog and its header element.
     */
    header?: ReactNode

    /**
     * A unique identifier for the dialog element.
     *
     * @remarks
     * Used as the `id` attribute on the rendered dialog element, and to
     * generate the `aria-labelledby` reference that associates the dialog
     * with its header. This value must be unique within the document.
     */
    id: string

    /**
     * Callback fired when the dialog layer becomes the topmost active layer
     * after not previously being the top layer.
     *
     * @remarks
     * Receives an object containing the `activeElement` at the time of activation.
     * Useful for managing focus or performing side effects when the dialog
     * gains prominence in a multi-layer stack.
     */
    onActivate?: LayerProps['onActivate']

    /**
     * Callback fired when the user clicks outside the dialog card.
     *
     * @remarks
     * Typically used to close the dialog when the user clicks on the
     * overlay/backdrop area surrounding the dialog card.
     */
    onClickOutside?: () => void

    /**
     * Callback fired when the dialog requests to be closed.
     *
     * @remarks
     * Triggered when the user clicks the close button in the dialog header.
     * The dialog does not close automatically; the consumer must update state
     * to unmount the dialog in response to this callback.
     */
    onClose?: () => void

    /**
     * Controls whether the dialog is currently visible.
     *
     * @remarks
     * When `true`, the dialog is rendered and visible. When `false` or
     * `undefined`, the dialog is not rendered.
     *
     * Note: The `Dialog` component is always rendered into a portal
     * regardless of this prop. To fully unmount the dialog, remove
     * the `<Dialog>` element from the component tree.
     */
    open?: boolean

    /**
     * The name of a named portal element to render the dialog into.
     *
     * @remarks
     * When specified, the dialog is rendered into the named portal
     * registered with the nearest {@link PortalProvider}. When omitted,
     * the dialog renders into the default portal element.
     */
    portal?: string

    /**
     * Controls the CSS positioning scheme of the dialog overlay.
     *
     * @remarks
     * Determines how the dialog is positioned relative to the viewport or
     * a positioned ancestor. Supports responsive values.
     *
     * @defaultValue `"fixed"` (or the value from DialogContext if available)
     */
    position?: ResponsiveProp<DialogPosition>

    /**
     * Sets the color scheme of the dialog card.
     *
     * @remarks
     * Determines whether the dialog renders in a light or dark color mode.
     * Child components inherit this scheme unless they specify their own.
     */
    scheme?: ColorScheme

    /**
     * Sets the color tone of the dialog card.
     *
     * @remarks
     * Controls the background and foreground colors applied to the dialog card.
     */
    tone?: CardTone | 'inherit'

    /**
     * Controls the z-index offset of the dialog layer.
     *
     * @remarks
     * Used to determine the stacking order of the dialog relative to other
     * layers in the application. Higher values place the dialog above lower ones.
     * Supports responsive values via an array.
     *
     * @defaultValue Z_OFFSETS.dialog (from DialogContext if available)
     */
    zOffset?: number | number[]
  }

/**
 * Accepted values for the `as` prop of the {@link Dialog} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Dialog`.
 *
 * @public
 */
export type DialogElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link Dialog} component.
 *
 * @remarks
 * Combines {@link DialogOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link DialogElementType}.
 *
 * @public
 */
export type DialogProps<E extends DialogElementType = DialogElementType> = Props<DialogOwnProps, E>

/**
 * A modal dialog component that renders content in a portal layer above
 * the rest of the application.
 *
 * @remarks
 * The `Dialog` component creates an accessible modal dialog following WAI-ARIA
 * patterns. It renders into a portal, manages focus trapping between sentinel
 * elements, and supports stacking with other dialogs and layers via the
 * {@link Layer} system.
 *
 * The dialog consists of a container with optional `header`, `footer`, and
 * children content areas. A close button is rendered in the header by default
 * unless `__unstable_hideCloseButton` is `true`.
 *
 * @public
 */
export function Dialog<E extends DialogElementType = typeof DEFAULT_DIALOG_ELEMENT>(
  props: DialogProps<E>,
): React.JSX.Element {
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
  const boundaryElement = use(BoundaryElementContext)
  const cardRadius = useMemo(() => _getResponsiveProp(cardRadiusProp), [cardRadiusProp])
  const position = useMemo(() => _getResponsiveProp(positionProp), [positionProp])
  const zOffset = useMemo(() => _getResponsiveProp(zOffsetProp), [zOffsetProp])

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
