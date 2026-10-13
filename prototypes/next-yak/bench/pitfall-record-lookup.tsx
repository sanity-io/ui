import {css, styled} from 'next-yak'

// The obvious way to write typed variants — a Record<Tone, mixin> selected at runtime.
type Tone = 'default' | 'primary'

const toneStyles = {
  default: css`
    background: white;
  `,
  primary: css`
    background: blue;
  `,
} satisfies Record<Tone, unknown>

export const Button = styled.button<{$tone: Tone}>`
  padding: 8px;
  ${({$tone}) => toneStyles[$tone]}
`
