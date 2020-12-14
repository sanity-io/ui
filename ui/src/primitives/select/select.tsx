import {ChevronDownIcon} from '@sanity/icons'
import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {Box} from '../box'
import {Text} from '../text'
import {selectStyle} from './styles'

interface SelectProps {
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: number | number[]
  space?: number | number[]
  customValidity?: string
}

const Root = styled.div(selectStyle.root)

const Input = styled.select<{
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: number | number[]
  space?: number | number[]
}>(selectStyle.input)

const IconBox = styled(Box)(selectStyle.iconBox)

export const Select = forwardRef(
  (
    props: SelectProps & Omit<React.HTMLProps<HTMLSelectElement>, 'as'>,
    forwardedRef: React.Ref<HTMLSelectElement>
  ) => {
    const {
      children,
      customValidity,
      fontSize = 2,
      padding = 3,
      radius: radiusProp = 1,
      space = 3,
      ...restProps
    } = props

    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    return (
      <Root>
        <Input
          data-ui="Select"
          {...restProps}
          fontSize={fontSize}
          padding={padding}
          radius={radiusProp}
          ref={ref}
          space={space}
        >
          {children}
        </Input>

        <IconBox padding={padding}>
          <Text size={fontSize}>
            <ChevronDownIcon />
          </Text>
        </IconBox>
      </Root>
    )
  }
)

Select.displayName = 'Select'
