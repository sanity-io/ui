import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {Box} from '../box/Box'
import {Label} from '../label/Label'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type RadioProps, radioProps} from './radio.props'

/** @beta */
export function Radio(props: RadioProps) {
  const {className, style, label, ...rest} = getProps(props, radioProps)

  return (
    <Label
      className={classNames('sui-Radio', className)}
      style={style}
      data-ui="Radio"
      disabled={props.disabled}
    >
      <VisuallyHidden as="input" type="radio" className="sui-RadioInput" {...rest} />

      <Box
        as="span"
        className="sui-RadioMark"
        position="relative"
        radius="full"
        width="17px"
        height="17px"
      />

      {label}
    </Label>
  )
}
