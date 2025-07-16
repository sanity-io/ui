import {_fromEntries} from './_fromEntries'

/** @public */
export const BREAKPOINTS = {
  0: 0,
  1: 360,
  2: 600,
  3: 900,
  4: 1200,
  5: 1800,
  6: 2400,
}

/**
 * Can be used as the `conditions` in a `defineProperties` call from `@vanilla-extract/sprinkles`
 * @public
 */
export const breakpointsConditions = _fromEntries<
  `${keyof typeof BREAKPOINTS}`,
  {'@media': `screen and (min-width: ${number}px)`} | {'@media'?: never}
>(
  Object.entries(BREAKPOINTS).map(([_index, bp]) => {
    const index = Number(_index) as keyof typeof BREAKPOINTS

    return [
      `${index}`,
      bp === 0
        ? {}
        : {
            '@media': `screen and (min-width: ${bp}px)` as const,
          },
    ]
  }),
)

/**
 * Can be used as the `responsiveArray` in a `defineProperties` call from `@vanilla-extract/sprinkles`
 * @public
 */
export const breakpointsResponsiveArray = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
] as const satisfies `${keyof typeof BREAKPOINTS}`[]
