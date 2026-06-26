#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

function createUi() {
  const name = process.argv[2]

  if (!name) {
    return console.error('\x1b[33m', 'Error: Name required.')
  }

  if (/[A-Z]/.test(name)) {
    return console.error('\x1b[33m', 'Error: Name must be kebab-case (e.g., new-component).')
  }

  const componentDirectory = path.join(path.resolve(), `/packages/ui/src/components/${name}`)

  if (fs.existsSync(componentDirectory)) {
    return console.error('\x1b[33m', 'Error: Component directory already exists.')
  }

  const componentName = getName(name, true)
  const storyFile = path.join(
    path.resolve(),
    `/apps/storybook/src/stories/${componentName}.stories.tsx`,
  )

  if (fs.existsSync(storyFile)) {
    return console.error('\x1b[33m', 'Error: Storybook file already exists.')
  }

  const indexFile = path.join(path.resolve(), `/packages/ui/src/index.ts`)
  const propsName = getName(name)

  fs.mkdir(componentDirectory, {}, (err) => {
    if (err) console.error('\x1b[33m', `Error: ${err}`)
    fs.writeFileSync(
      `${componentDirectory}/${componentName}.tsx`,
      getComponentFile(componentName, propsName),
    )
    fs.writeFileSync(
      `${componentDirectory}/${propsName}.props.ts`,
      getPropsFile(componentName, propsName),
    )
  })

  fs.writeFileSync(storyFile, getStoryFile(componentName, propsName, name))
  fs.appendFileSync(indexFile, `export * from './components/${name}/${componentName}'\n`)

  // oxlint-disable-next-line no-console
  console.log('\x1b[32m', `Successfully created ${componentName} component`)
}

function getName(name, isCapitalized) {
  return name
    .split('-')
    .map((part, i) => {
      if (i === 0 && !isCapitalized) {
        return part
      }

      return part[0].toUpperCase() + part.slice(1)
    })
    .join('')
}

function getComponentFile(componentName, propsName) {
  return `import classNames from 'classnames'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {type ${componentName}Props, ${propsName}Props} from './${propsName}.props'

/** @public */
export function ${componentName}<T extends ElementType = 'div'>(
  props: ${componentName}Props<T> & Omit<ComponentPropsWithRef<T>, keyof ${componentName}Props<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, ${propsName}Props)
  const Component = as || 'div'

  return (
    <Component
      className={classNames('sui-${componentName}', className)}
      style={style}
      data-ui="${componentName}"
      {...rest}
    >
      {children}
    </Component>
  )
}\n`
}

function getPropsFile(componentName, propsName) {
  return `import {type PropDef} from '../../types/PropDef'

/** @public */
export interface ${componentName}Props<T extends React.ElementType> {
  /** Element to render */
  as?: T
}

export const ${propsName}Props: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
}\n`
}

function getStoryFile(componentName, propsName, name) {
  return `import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect} from 'storybook/test'

import {${componentName}} from '../../../../packages/ui/src/components/${name}/${componentName}'
import {${propsName}Props} from '../../../../packages/ui/src/components/${name}/${propsName}.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(${propsName}Props)

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  args: {},
  argTypes,
  component: ${componentName},
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '.sui-${componentName}',
    },
  },
}

export default meta
type Story = StoryObj<typeof ${componentName}>

export const Default: Story = {
  render: (props) => {
    return <${componentName} {...props} />
  },
  play: async ({canvas}) => {
    await expect((await canvas.findByText('')).classList).toContain('')
  },
}\n`
}

createUi()
