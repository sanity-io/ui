import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'
import {cleanup} from '@testing-library/react'
import {afterEach} from 'vitest'

// @testing-library/react only registers its auto-cleanup when test globals are
// enabled, so register it manually
afterEach(() => {
  cleanup()
})
