import {AnimatePresence, motion, type Variants} from 'framer-motion'
import {useMemo, useRef, useState, startTransition, useEffect} from 'react'
import {styled} from 'styled-components'
import {useMounted} from '../../hooks/useMounted'
import {usePrefersReducedMotion} from '../../hooks/usePrefersReducedMotion'
import {Grid, type GridProps} from '../../primitives/grid'
import {Layer, useLayer} from '../../utils'
import {Toast} from './toast'
import {ToastContext} from './toastContext'
import {generateToastId} from './toastState'
import {ToastContextValue, ToastParams} from './types'
import {useArrayProp} from '../../hooks'

/**
 * @public
 */
export interface ToastLayerProps {
  children: React.ReactNode
  padding?: number | number[]
  paddingX?: number | number[]
  paddingY?: number | number[]
  gap?: number | number[]
}

/**
 * @internal
 */
export function ToastLayer(props: ToastLayerProps): React.JSX.Element {
  const {children, padding = 4, paddingX, paddingY, gap = 3} = props
  const {zIndex} = useLayer()

  return (
    <StyledLayer
      forwardedAs="ul"
      data-ui="ToastProvider"
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      gap={gap}
      $zIndex={zIndex}
    >
      {children}
    </StyledLayer>
  )
}

ToastLayer.displayName = 'ToastLayer'

const StyledLayer = styled(Grid).attrs<{$zIndex: number}>((props) => ({
  style: {
    zIndex: props.$zIndex,
  },
}))`
  box-sizing: border-box;
  position: fixed;
  right: 0;
  bottom: 0;
  list-style: none;
  pointer-events: none;
  max-width: 420px;
  width: 100%;
`

/**
      // $paddingY={useArrayProp(paddingY)}
 *     position: fixed;
    left: calc(50% - 150px);
    bottom: 0;
    display: flex
;
    flex-direction: column;
    list-style: none;
    justify-content: flex-end;
    width: 300px;
    gap: 10px;
    padding: 10px;
}
 */
