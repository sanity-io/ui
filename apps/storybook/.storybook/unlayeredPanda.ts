import {parse} from 'postcss'
import type {Plugin} from 'vite'

/**
 * `@sanity/ui/styles.css` is published without cascade layers (`cascadeLayers: false` in
 * `packages/ui/tsdown.config.mts`), while `@pandacss/vite` appends Panda's layered stylesheet to
 * `panda.css`. This moves its rules out of their `@layer` blocks, in place, so that Storybook
 * cascades like the published stylesheet. Document order is the layer order here because the
 * config has no recipes or compositions, which Panda emits in sublayers.
 */
export function unlayeredPanda(): Plugin {
  return {
    name: 'sanity-ui:unlayered-panda',
    transform(code, id) {
      if (!(id.split('?')[0] ?? id).endsWith('/.storybook/panda.css')) return null

      const root = parse(code)

      // A walk skips the nodes it moves into the parent, so repeat until a
      // pass finds no layers
      for (let found = true; found;) {
        found = false
        root.walkAtRules('layer', (rule) => {
          found = true
          if (rule.nodes) rule.replaceWith(rule.nodes)
          else rule.remove()
        })
      }

      return {code: root.toString(), map: null}
    },
  }
}
