import React, {forwardRef} from 'react'
import styled from 'styled-components'

const Root = styled.textarea`
  appearance: none;
  color: inherit;
  background: none;
  font: inherit;
  border: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
  resize: none;
  outline: none;
  width: auto;
`

export const TextArea = forwardRef(
  (
    props: Omit<React.HTMLProps<HTMLTextAreaElement>, 'as'>,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    const {...restProps} = props

    return <Root {...restProps} ref={ref} />
  }
)

TextArea.displayName = 'TextArea'
