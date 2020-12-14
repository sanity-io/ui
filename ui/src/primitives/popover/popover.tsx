import maxSize from 'popper-max-size-modifier'
import React, {cloneElement, forwardRef, useEffect, useMemo, useState} from 'react'
import {Modifier, usePopper} from 'react-popper'
import styled, {css} from 'styled-components'
import {ThemeColorSchemeKey, ThemeColorToneKey} from '../../theme'
import {Placement} from '../../types'
import {Layer, Portal, useBoundaryElement, usePortal} from '../../utils'
import {Card} from '../card'
import {ResponsiveWidthStyleProps} from '../container'
import {responsiveContainerWidthStyle} from '../container/styles'
import {PopoverArrow} from './arrow'

interface PopoverProps extends ResponsiveWidthStyleProps {
  allowedAutoPlacements?: Placement[]
  arrow?: boolean
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  constrainSize?: boolean
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  open?: boolean
  padding?: number | number[]
  placement?: Placement
  portal?: boolean
  preventOverflow?: boolean
  radius?: number | number[]
  referenceElement?: HTMLElement | null
  shadow?: number | number[]
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorToneKey
}

const Root = styled(Layer)<{preventOverflow?: boolean}>(
  ({preventOverflow}) => css`
    pointer-events: none;
    display: flex;
    flex-direction: column;

    & > * {
      min-height: 0;
    }

    /* Hide the popover when the reference element is out of bounds */
    ${preventOverflow &&
    css`
      &[data-popper-reference-hidden='true'] {
        display: none;
      }
    `}
  `
)

const PopoverCard = styled(Card)<
  ResponsiveWidthStyleProps & {
    constrainSize?: boolean
    preventOverflow?: boolean
  }
>(
  ({constrainSize}) => css`
    flex: 1;
    max-height: ${constrainSize && '100%'};
    height: stretch;
    pointer-events: all;
    && {
      display: flex;
    }
    flex-direction: column;
    & > * {
      min-height: 0;
    }
    ${responsiveContainerWidthStyle}
  `
)

const applyMaxSize: Modifier<any, any> = {
  name: 'applyMaxSize',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['maxSize'],
  fn(opts) {
    const {state} = opts
    const {width, height} = state.modifiersData.maxSize

    state.styles.popper = {
      ...state.styles.popper,
      maxWidth: `${width}px`,
      maxHeight: `${height}px`,
    }
  },
}

export const Popover = forwardRef(
  (
    props: PopoverProps &
      Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'width'>,
    ref
  ) => {
    const boundaryElementContext = useBoundaryElement()
    const {
      allowedAutoPlacements,
      arrow = true,
      boundaryElement: boundaryElementProp = boundaryElementContext,
      children: child,
      content,
      constrainSize,
      disabled,
      fallbackPlacements,
      open,
      padding,
      placement: placementProp,
      portal: portalProp = false,
      preventOverflow,
      radius = 3,
      referenceElement: referenceElementProp,
      shadow = 3,
      scheme,
      style = {},
      tone,
      width = 0,
      ...restProps
    } = props
    const placement = typeof placementProp === 'string' ? placementProp : 'bottom'
    const portal = usePortal()
    const boundaryElement = boundaryElementProp || portal.boundaryElement
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)
    const popperReferenceElement = referenceElementProp || referenceElement

    const customMaxSize: Modifier<any, any> = useMemo(
      () => ({
        ...maxSize,
        options: {boundary: boundaryElement || undefined, padding: 8},
      }),
      [boundaryElement]
    )

    const modifiers = [
      constrainSize && customMaxSize,
      constrainSize && applyMaxSize,
      arrow && {
        name: 'arrow',
        options: {
          element: arrowElement,
          padding: 4,
        },
      },
      preventOverflow && {
        name: 'preventOverflow',
        options: {
          altAxis: true,
          boundary: boundaryElement || undefined,
          padding: 8,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
      {
        name: 'flip',
        options: {
          allowedAutoPlacements,
          fallbackPlacements,
        },
      },
    ].filter(Boolean) as Modifier<any, any>[]

    const popper = usePopper(popperReferenceElement, popperElement, {
      placement,
      modifiers,
    })

    const {attributes, forceUpdate, styles} = popper

    useEffect(() => {
      if (forceUpdate) forceUpdate()
    }, [content, forceUpdate, open, popperReferenceElement])

    if (disabled) {
      return child || <></>
    }

    const setRef = (el: HTMLElement | null) => {
      const childRef = (child as any).ref

      setReferenceElement(el)

      if (typeof childRef === 'function') {
        childRef(el)
      } else if (childRef) {
        childRef.current = el
      }
    }

    const setRootRef = (el: HTMLDivElement | null) => {
      setPopperElement(el)
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    const node = (
      <Root
        data-ui="Popover"
        {...restProps}
        preventOverflow={preventOverflow}
        ref={setRootRef}
        style={{...style, ...styles.popper}}
        {...attributes.popper}
      >
        <PopoverCard
          constrainSize={constrainSize}
          data-ui="PopoverCard"
          padding={padding}
          radius={radius}
          scheme={scheme}
          shadow={shadow}
          tone={tone}
          width={width as any}
        >
          {arrow && <PopoverArrow ref={setArrowElement} tone="default" style={styles.arrow} />}
          {content}
        </PopoverCard>
      </Root>
    )

    return (
      <>
        {child && !referenceElementProp ? cloneElement(child, {ref: setRef}) : child || <></>}

        {open && (
          <>
            {portalProp && <Portal>{node}</Portal>}

            {!portalProp && node}
          </>
        )}
      </>
    )
  }
)

Popover.displayName = 'Popover'
