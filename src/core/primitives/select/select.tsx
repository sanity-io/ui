import {ChevronDownIcon} from '@sanity/icons'
import {forwardRef, useImperativeHandle, useMemo, useRef} from 'react'
import {styled} from 'styled-components'
import {useCustomValidity} from '../../hooks'
import {_getArrayProp} from '../../styles'
import {Radius} from '../../types'
import {Box} from '../box'
import {Text} from '../text'
import {selectStyle} from './styles'

/**
 * @public
 */
export interface SelectProps {
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: Radius | Radius[]
  space?: number | number[]
  customValidity?: string
}

const Root = styled.div(selectStyle.root)

const Input = styled.select<{
  $fontSize: number[]
  $padding: number[]
  $radius: Radius[]
  $space: number[]
}>(selectStyle.input)

const IconBox = styled(Box)(selectStyle.iconBox)

/**
 * The `Select` component provides control of options.
 *
 * @public
 */
export const Select = forwardRef(function Select(
  props: SelectProps & Omit<React.HTMLProps<HTMLSelectElement>, 'as'>,
  forwardedRef: React.ForwardedRef<HTMLSelectElement>,
) {
  const {
    children,
    customValidity,
    disabled,
    fontSize = 2,
    padding = 3,
    radius = 2,
    readOnly,
    space = 3,
    ...restProps
  } = props

  const ref = useRef<HTMLSelectElement | null>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  const $fontSize = useMemo(() => _getArrayProp(fontSize), [fontSize])
  const $padding = useMemo(() => _getArrayProp(padding), [padding])
  const $radius = useMemo(() => _getArrayProp(radius), [radius])
  const $space = useMemo(() => _getArrayProp(space), [space])

  return (
    <Root data-ui="Select">
      <Input
        data-read-only={!disabled && readOnly ? '' : undefined}
        data-ui="Select"
        {...restProps}
        $fontSize={$fontSize}
        $padding={$padding}
        $radius={$radius}
        $space={$space}
        disabled={disabled || readOnly}
        ref={ref}
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
})
