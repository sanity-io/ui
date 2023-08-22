/* eslint-disable @typescript-eslint/no-explicit-any */
// Workaround types that are missing in v6
// https://github.com/styled-components/styled-components/issues/4062

import type {StyledObject} from 'styled-components'

/** @internal */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CSSObject = StyledObject<any>
