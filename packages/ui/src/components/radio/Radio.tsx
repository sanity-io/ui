import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {Box} from '../box/Box'
import {Label} from '../label/Label'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type RadioProps, radioProps} from './radio.props'

/** @beta */
export function Radio(props: RadioProps) {
  const {className, style, label, disabled, error, ...rest} = getProps(props, radioProps)

  return (
    <Label
      className={classNames('sui-Radio', className)}
      style={style}
      data-ui="Radio"
      disabled={disabled}
      error={error}
    >
      <VisuallyHidden
        as="input"
        type="radio"
        className="sui-RadioInput"
        disabled={disabled}
        {...rest}
      />

      <Box
        as="span"
        className={classNames('sui-RadioMark', error && 'sui-error')}
        position="relative"
        radius="full"
        width="17px"
        height="17px"
      />

      {label}
    </Label>
  )
}
