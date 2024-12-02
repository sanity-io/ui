import {ChevronDownIcon} from '@sanity/icons'
import {ResponsiveProp, select} from '@sanity/ui/css'
import {FontTextSize, Radius, Space} from '@sanity/ui/theme'
import {forwardRef, useImperativeHandle, useRef} from 'react'
import {useCustomValidity} from '../../hooks'
import {Box} from '../box'
import {Text} from '../text'

/**
 * @public
 */
export interface SelectProps {
  fontSize?: ResponsiveProp<FontTextSize>
  padding?: ResponsiveProp<Space>
  radius?: ResponsiveProp<Radius>
  space?: ResponsiveProp<Space>
  customValidity?: string
}

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
    fontSize = 1,
    padding = 2,
    radius = 2,
    readOnly,
    space = 2,
    ...restProps
  } = props

  const ref = useRef<HTMLSelectElement | null>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <div
      // const Root = styled.div(selectStyle.root)
      className={select({fontSize, padding, radius, space})}
      data-ui="Select"
    >
      <select
        // const Input = styled.select
        data-read-only={!disabled && readOnly ? '' : undefined}
        // data-ui="Select"
        {...restProps}
        // $fontSize={useArrayProp(fontSize)}
        // $padding={useArrayProp(padding)}
        // $radius={useArrayProp(radius)}
        // $space={useArrayProp(space)}
        disabled={disabled || readOnly}
        ref={ref}
      >
        {children}
      </select>

      <Box
        display="inline-block"
        // const IconBox = styled(Box)(selectStyle.iconBox)
        padding={padding}
      >
        <Text size={fontSize}>
          <ChevronDownIcon />
        </Text>
      </Box>
    </div>
  )
})

Select.displayName = 'ForwardRef(Select)'
