import {setProjectAnnotations} from '@storybook/react-vite'
import {beforeAll} from 'vitest'

import * as projectAnnotations from './preview'

// Apply the project-level annotations (decorators, parameters, etc.) from
// .storybook/preview.tsx to stories rendered with `composeStories` in the
// "tests" vitest project. The "storybook" project applies these automatically.
const annotations = setProjectAnnotations([projectAnnotations])

beforeAll(annotations.beforeAll)
