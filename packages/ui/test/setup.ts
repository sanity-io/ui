/// <reference types="@vitest/browser/context" />

import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'
import './mocks/resizeObserver.mock'
import './mocks/matchMedia.mock'

import * as React from 'react'

// Make React available globally for JSX in tests
globalThis.React = React
