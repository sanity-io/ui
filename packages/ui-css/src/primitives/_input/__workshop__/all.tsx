import {CheckmarkIcon, RemoveIcon, SelectIcon} from '@sanity/icons'
import {
  _input_element,
  _input_presentation,
  _switch,
  _switch_element,
  _switch_presentation,
  _switch_thumb,
  _switch_track,
  box,
  card,
  checkbox,
  checkbox_input,
  checkbox_presentation,
  flex,
  radio,
  radio_input,
  radio_presentation,
  select,
  select_input,
  select_presentation,
  text,
  textArea,
  textArea_element,
  textArea_presentation,
  textInput,
  textInput_element,
  textInput_prefix,
  textInput_suffix,
} from '@sanity/ui-css'
import {CARD_TONES} from '@sanity/ui-tokens/system'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

export default function AllStory() {
  const cardTone = useSelect('Card tone', CARD_TONES, CARD_TONES[0])

  const disabled = useBoolean('Disabled', false)
  const invalid = useBoolean('Invalid', false)
  const readOnly = useBoolean('Read only', false)

  return (
    <div className={card({padding: 6, tone: cardTone})}>
      <div className={flex({direction: 'column', gap: 6})}>
        {/* checkbox */}
        <Checkbox disabled={disabled} invalid={invalid} readOnly={readOnly} />
        <Radio disabled={disabled} invalid={invalid} readOnly={readOnly} />
        <Select disabled={disabled} invalid={invalid} readOnly={readOnly} />
        <Switch disabled={disabled} invalid={invalid} readOnly={readOnly} />
        <TextArea disabled={disabled} invalid={invalid} readOnly={readOnly} />
        <TextInput disabled={disabled} invalid={invalid} readOnly={readOnly} />
      </div>
    </div>
  )
}

function Checkbox(props: {invalid: boolean; disabled: boolean; readOnly: boolean}) {
  const {invalid, disabled, readOnly} = props

  return (
    <div className={checkbox({})}>
      <input
        className={checkbox_input()}
        data-invalid={invalid ? '' : undefined}
        disabled={disabled}
        readOnly={readOnly}
        type="checkbox"
      />
      <span className={checkbox_presentation()}>
        <CheckmarkIcon />
        <RemoveIcon />
      </span>
    </div>
  )
}

function Radio(props: {invalid: boolean; disabled: boolean; readOnly: boolean}) {
  const {invalid, disabled, readOnly} = props

  return (
    <div className={radio({})}>
      <input
        className={radio_input()}
        data-invalid={invalid ? '' : undefined}
        disabled={disabled}
        readOnly={readOnly}
        type="radio"
      />
      <span className={radio_presentation()} />
    </div>
  )
}

function Select(props: {invalid: boolean; disabled: boolean; readOnly: boolean}) {
  const {invalid, disabled, readOnly} = props

  return (
    <div className={select({border: true})}>
      <select
        className={select_input()}
        data-invalid={invalid ? '' : undefined}
        data-read-only={readOnly ? '' : undefined}
        disabled={disabled}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <span className={select_presentation()}>
        <span>
          <span className={text({})}>
            <SelectIcon />
          </span>
        </span>
      </span>
    </div>
  )
}

function Switch(props: {invalid: boolean; disabled: boolean; readOnly: boolean}) {
  const {invalid, disabled, readOnly} = props

  return (
    <div className={_switch({})}>
      <input
        className={_switch_element()}
        data-invalid={invalid ? '' : undefined}
        disabled={disabled}
        readOnly={readOnly}
        type="checkbox"
      />
      <span className={_switch_presentation()}>
        <span className={_switch_track()} />
        <span className={_switch_thumb()} />
      </span>
    </div>
  )
}

function TextArea(props: {invalid: boolean; disabled: boolean; readOnly: boolean}) {
  const {invalid, disabled, readOnly} = props

  return (
    <div className={textArea({border: true})}>
      <textarea
        className={textArea_element()}
        data-invalid={invalid ? '' : undefined}
        disabled={disabled}
        placeholder="placeholder"
        readOnly={readOnly}
        rows={4}
      />
      <span className={textArea_presentation()}></span>
    </div>
  )
}

function TextInput(props: {invalid: boolean; disabled: boolean; readOnly: boolean}) {
  const {invalid, disabled, readOnly} = props

  return (
    <div className={textInput({border: true})}>
      <span className={textInput_prefix()}>
        <span>
          <span className={box({padding: 3})}>
            <span className={text({})}>prefix</span>
          </span>
        </span>
      </span>
      <span className={textInput_element()}>
        <input
          className={_input_element()}
          data-invalid={invalid ? '' : undefined}
          disabled={disabled}
          placeholder="placeholder"
          readOnly={readOnly}
          type="text"
        />
        <span className={_input_presentation()}></span>
      </span>
      <span className={textInput_suffix()}>
        <span>
          <span className={box({padding: 3})}>
            <span className={text({})}>suffix</span>
          </span>
        </span>
      </span>
    </div>
  )
}
