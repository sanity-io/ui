import {ChevronDownIcon} from '@sanity/icons'
import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {ColorSchemeKey} from '../../theme'
import {Box} from '../box'
import {useCard} from '../card'
import {Text} from '../text'
import {select} from './styles'

const Root = styled.div(select.root)

const Input = styled.select<{
  padding?: number | number[]
  radius?: number | number[]
  scheme: ColorSchemeKey
  space?: number | number[]
  uiSize?: number | number[]
}>(select.input)

const IconBox = styled(Box)<{scheme: ColorSchemeKey}>(select.iconBox)

interface SelectProps {
  padding?: number | number[]
  radius?: number | number[]
  size?: number | number[]
  space?: number | number[]
  customValidity?: string
}

export const Select = forwardRef(
  (
    props: SelectProps & Omit<React.HTMLProps<HTMLSelectElement>, 'as' | 'size'>,
    forwardedRef: React.Ref<HTMLSelectElement>
  ) => {
    const {
      children,
      customValidity,
      padding = 3,
      radius: radiusProp = 1,
      size = 2,
      space = 3,
      ...restProps
    } = props
    const {scheme} = useCard()

    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    return (
      <Root>
        <Input
          data-ui="Select"
          {...restProps}
          padding={padding}
          radius={radiusProp}
          ref={ref}
          scheme={scheme}
          space={space}
          uiSize={size}
        >
          {children}
        </Input>

        <IconBox padding={padding} scheme={scheme}>
          <Text size={size}>
            <ChevronDownIcon />
          </Text>
        </IconBox>
      </Root>
    )
  }
)

Select.displayName = 'Select'
