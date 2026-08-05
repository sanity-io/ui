import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, waitFor} from 'storybook/test'
import {Code as CodeV3} from 'ui3'

import {Code} from '../../../../packages/ui/src/components/code/Code'
import {codeProps} from '../../../../packages/ui/src/components/code/code.props'
import {Text} from '../../../../packages/ui/src/components/text/Text'
import {CODE_SIZE} from '../../../../packages/ui/src/types/Code'
import {RefractorLanguage} from '../components/RefractorLanguage'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(codeProps)

const meta: Meta<typeof Code> = {
  title: 'Typography/Code',
  args: {
    children: 'Code Component',
  },
  argTypes,
  component: Code,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Code"]',
    },
    performance: {
      component: Code,
      compareComponent: CodeV3,
    },
  },
}

export default meta
type Story = StoryObj<typeof Code>

export const Default: Story = {
  render: (props) => {
    return <Code {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('Code Component')).tagName).toBe('CODE')
  },
}

export const Inline: Story = {
  render: (props) => {
    return (
      <>
        <Text>Use the command </Text>
        <Code {...props} as="span">
          pnpm run dev
        </Code>
        <Text> to run.</Text>
      </>
    )
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('pnpm run dev')).parentElement?.tagName).toBe('SPAN')
  },
}

export const Sizes: Story = {
  render: (props) => {
    return (
      <>
        {CODE_SIZE.map((size) => (
          <Code {...props} key={size} size={size}>
            Code Size {size} ({['10px', '13px', '16px', '18.75px', '21.5px'][size]})
          </Code>
        ))}
      </>
    )
  },
  play: async ({canvas}) => {
    await expect(
      (await canvas.findByText('Code Size 3 (18.75px)')).parentElement?.closest('[data-ui="Code"]')
        ?.classList,
    ).toContain('sui-text-code3')
  },
}

export const SyntaxHighlighting: Story = {
  render: (props) => {
    return (
      <RefractorLanguage>
        <Code {...props} language="css" marginBottom={4}>
          {`.code::before {\n  content: '';\n  color: black;\n}`}
        </Code>

        <Code {...props} language="javascript" marginBottom={4}>
          console.log('Code Component') // Comment
        </Code>

        <Code {...props} language="jsx">
          {`import Button from 'Button';\n\n<div>\n  <Button\n    className="button"\n    onClick={(e) => handleClick(e)}\n  >\n    Click\n  </Button>\n</div>`}
        </Code>
      </RefractorLanguage>
    )
  },
  play: async ({canvas}) => {
    await waitFor(async () => {
      const [code] = canvas.getAllByText(
        (_, el) =>
          el?.textContent === `console.log('Code Component') // Comment` && el?.tagName === 'CODE',
      )
      await expect(code.classList).toContain('refractor')
    })
  },
}
