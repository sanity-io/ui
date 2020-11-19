import React, {forwardRef, useEffect} from 'react'
import styled from 'styled-components'
import {useForwardedRef} from '../../hooks'
import {ThemeColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {
  switchBaseStyles,
  switchRepresentationStyles,
  switchThumbStyles,
  switchTrackStyles,
  switchInputStyles,
} from './styles'

interface SwitchProps {
  indeterminate?: boolean
}

const Root = styled.span<{scheme: ThemeColorSchemeKey}>(switchBaseStyles)
const Input = styled.input<{scheme: ThemeColorSchemeKey}>(switchInputStyles)
const Representation = styled.span<{scheme: ThemeColorSchemeKey}>(switchRepresentationStyles)
const Track = styled.span(switchTrackStyles)
const Thumb = styled.span<{checked?: boolean; indeterminate?: boolean}>(switchThumbStyles)

export const Switch = forwardRef(
  (
    props: Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'> & SwitchProps,
    forwardedRef: React.ForwardedRef<HTMLInputElement>
  ) => {
    const {checked, className, indeterminate, style, ...restProps} = props
    const card = useCard()

    const ref = useForwardedRef(forwardedRef)

    useEffect(() => {
      if (ref.current) {
        // Set the indeterminate state
        ref.current.indeterminate = indeterminate || false
      }
    }, [indeterminate, ref])

    return (
      <Root className={className} data-ui="Switch" style={style} scheme={card.scheme}>
        <Input
          {...restProps}
          checked={indeterminate !== true && checked}
          scheme={card.scheme}
          type="checkbox"
          ref={ref}
        />
        <Representation aria-hidden data-name="representation" scheme={card.scheme}>
          <Track />
          <Thumb checked={checked} indeterminate={indeterminate} />
        </Representation>
      </Root>
    )
  }
)

Switch.displayName = 'Switch'
