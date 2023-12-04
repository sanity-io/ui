import type {StyledObject} from 'styled-components'

/**
 * Work around types that are missing in `styled-components@6`
 * https://github.com/styled-components/styled-components/issues/4062
 * @internal
 * */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CSSObject = StyledObject<any>
