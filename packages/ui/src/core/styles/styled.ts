import {
  createGlobalStyle,
  css,
  styled as styledComponents,
  type StyledInstance,
} from 'styled-components'

/**
 * The cascade layer of every rule that the styled components of @sanity/ui emit. Unlayered CSS
 * beats it regardless of specificity, and so does any layer ordered after it.
 *
 * @internal
 */
export const STYLED_LAYER = 'u-styled'

/**
 * The layers that the rules in `STYLED_LAYER` must beat, lowest priority first: ui5's `sui`,
 * whose global reset zeroes `margin`, `padding` and `border`, and the layers of
 * `@sanity/ui/styles.css`.
 *
 * @internal
 */
export const LAYER_ORDER = ['sui', 'u-tokens', 'u-utilities', STYLED_LAYER] as const

/**
 * Declares `LAYER_ORDER`. Layers are ordered by where the page first mentions them, so without
 * this a `<style data-styled>` tag that precedes `@sanity/ui/styles.css` would put `u-styled`
 * first and let the static styles win.
 *
 * styled-components emits sheet groups in the order they are registered, and `createGlobalStyle`
 * registers its group when it is called. Calling it in the module that every styled component of
 * @sanity/ui imports puts the statement ahead of every `@layer u-styled` block.
 *
 * @internal
 */
export const StyledLayerOrder = createGlobalStyle`@layer ${LAYER_ORDER.join(', ')};`

type StyledTemplate = StyledInstance<'web', any, any, any, any>

function layered<T extends StyledTemplate>(template: T): T {
  return new Proxy(template, {
    apply: (target, _thisArg, [styles, ...interpolations]: Parameters<typeof css>) =>
      target`@layer ${STYLED_LAYER}{${css(styles, ...interpolations)}}`,
    get: (target, key, receiver) =>
      key === 'attrs' || key === 'withConfig'
        ? (options: unknown) => layered(Reflect.apply(target[key], target, [options]))
        : Reflect.get(target, key, receiver),
  })
}

/**
 * styled-components' `styled`, with every rule emitted in the `u-styled` cascade layer.
 *
 * @internal
 */
export const styled = new Proxy(styledComponents, {
  apply: (target, thisArg, args: Parameters<typeof styledComponents>) =>
    layered(Reflect.apply(target, thisArg, args)),
  get: (target, key, receiver) => {
    const value = Reflect.get(target, key, receiver)

    return typeof value === 'function' ? layered(value) : value
  },
})
