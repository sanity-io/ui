/// <reference types="@testing-library/jest-dom/vitest" />

import * as matchers from '@testing-library/jest-dom/matchers'
import {cleanup} from '@testing-library/react'
import {afterEach, expect} from 'vitest'
// oxlint-disable-next-line no-unassigned-import
import 'vitest-axe/extend-expect'

// Do not import `@testing-library/jest-dom/vitest`. That entry resolves
// `vitest` from jest-dom's directory, and pnpm can link a different isolate
// of the same vitest version (different vite optional peers). The isolates
// share `@vitest/expect` but each has its own SnapshotClient, so
// `toMatchInlineSnapshot` then fails with SnapshotClient.setup().
expect.extend(matchers)

// @testing-library/react only registers its auto-cleanup when test globals are
// enabled, so register it manually
afterEach(() => {
  cleanup()
})
