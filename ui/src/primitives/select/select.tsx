import {ChevronDownIcon} from '@sanity/icons'
import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {Box} from '../box'
import {Text} from '../text'
import {select} from './styles'

interface SelectProps {
  padding?: number | number[]
  radius?: number | number[]
  size?: number | number[]
  space?: number | number[]
  customValidity?: string
}

const Root = styled.div(select.root)

const Input = styled.select<{
  padding?: number | number[]
  radius?: number | number[]
  size?: number | number[]
  space?: number | number[]
}>(select.input)

const IconBox = styled(Box)(select.iconBox)

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
          space={space}
          size={size as any}
        >
          {children}
        </Input>

        <IconBox padding={padding}>
          <Text size={size}>
            <ChevronDownIcon />
          </Text>
        </IconBox>
      </Root>
    )
  }
)

Select.displayName = 'Select'
