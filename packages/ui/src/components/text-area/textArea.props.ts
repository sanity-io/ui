import {formElementDensityProps, type FormElementDensityProps} from '../../props/formElement'
import {type HeightProps, heightProps} from '../../props/height'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface TextAreaProps
  extends
    React.ComponentProps<'textarea'>,
    FormElementDensityProps,
    Pick<HeightProps, 'maxHeight'> {
  /**
   * Sizes the textarea to its content via the CSS `field-sizing` property.
   */
  autoResize?: boolean
  /**
   * Used to trigger styling for invalid states.
   */
  hasError?: boolean
  /**
   * The html `rows` attribute. Defaults to 5.
   */
  rows?: number
}

export const textAreaProps: Record<string, PropDef> = {
  autoResize: {
    type: 'boolean',
    className: 'field-sizing-content',
  },
  hasError: {
    type: 'boolean',
  },
  maxHeight: heightProps['maxHeight'] as PropDef,
  ...formElementDensityProps,
}
