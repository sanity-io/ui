// `@testing-library/jest-dom/vitest` calls `expect.extend()` on its own
// `vitest` import, which pnpm can resolve to a different physical `vitest`
// install than the one running the tests (they don't share the same peer
// dependency graph), silently registering the matchers on the wrong
// `SnapshotClient`/`expect` singleton. Bring in its `Assertion` type
// augmentation only (elided at runtime) and extend the environment-agnostic
// matchers onto the `vitest` instance the test files import instead.
// oxlint-disable-next-line no-empty-named-blocks, require-module-specifiers
import type {} from '@testing-library/jest-dom/vitest'
// oxlint-disable-next-line no-unassigned-import
import 'vitest-axe/extend-expect'
import * as jestDomMatchers from '@testing-library/jest-dom/matchers'
import {cleanup} from '@testing-library/react'
import {afterEach, expect} from 'vitest'

expect.extend(jestDomMatchers)

// @testing-library/react only registers its auto-cleanup when test globals are
// enabled, so register it manually
afterEach(() => {
  cleanup()
})
