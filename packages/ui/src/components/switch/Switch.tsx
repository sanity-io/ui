import classNames from 'classnames'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {Flex} from '../flex/Flex'
import {Label} from '../label/Label'
import {VisuallyHidden} from '../visually-hidden/VisuallyHidden'
import {type SwitchProps, switchProps} from './switch.props'

const switchClassname = getVersionedClassname('sui-Switch')
const switchInputClassname = getVersionedClassname('sui-SwitchInput')
const switchMarkClassname = getVersionedClassname('sui-SwitchMark')

/** @beta */
export function Switch(props: SwitchProps) {
  const {className, style, disabled, error, label, ...rest} = getProps(props, switchProps)

  return (
    <Label
      className={classNames(switchClassname, className)}
      style={style}
      data-ui="Switch"
      disabled={props.disabled}
      error={error}
    >
      <VisuallyHidden
        as="input"
        type="checkbox"
        role="switch"
        className={switchInputClassname}
        disabled={disabled}
        {...rest}
      />

      <Flex
        as="span"
        className={classNames(switchMarkClassname, error && 'sui-error')}
        alignItems="center"
        radius={6}
        aria-hidden="true"
      />

      {label}
    </Label>
  )
}
