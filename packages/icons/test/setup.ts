/// <reference types="@testing-library/jest-dom/vitest" />

import * as matchers from '@testing-library/jest-dom/matchers'
import {expect} from 'vitest'

// See packages/ui/test/setup.ts — avoid `@testing-library/jest-dom/vitest`
// so matchers attach to this package's vitest isolate.
expect.extend(matchers)
