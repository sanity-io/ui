import {ChevronDownIcon} from '@sanity/icons'
import React, {forwardRef} from 'react'
import styled from 'styled-components'
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
  uiSize?: number | number[]
}>(select.input)

const IconBox = styled(Box)<{scheme: ColorSchemeKey}>(select.iconBox)

interface SelectProps {
  padding?: number | number[]
  radius?: number | number[]
  size?: number | number[]
}

export const Select = forwardRef(
  (
    props: SelectProps & Omit<React.HTMLProps<HTMLSelectElement>, 'as' | 'size'>,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const {children, padding = 3, radius: radiusProp = 1, size, ...restProps} = props
    const {scheme} = useCard()

    return (
      <Root>
        <Input
          data-ui="Select"
          {...restProps}
          scheme={scheme}
          padding={padding}
          radius={radiusProp}
          ref={ref}
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
