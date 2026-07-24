import {applyHues} from './applyHues'
import {parseHuesFromSearchParams} from './parseHuesFromSearchParams'
import {ThemePreset} from './types'

function definePreset(
  slug: string,
  title: string,
  searchParams: string,
): ThemePreset {
  return {
    slug,
    title,
    searchParams,
    hues: applyHues(parseHuesFromSearchParams(new URLSearchParams(searchParams))),
  }
}

const defaultPreset = definePreset(
  'default',
  'Studio v3',
  'lightest=fff&darkest=101112&default=8690a0;500&primary=2276fc;500&transparent=8690a0;500&positive=43d675;400&caution=fbd024;300&critical=f03e2f;500',
)

/**
 * The preset themes of the hosted Themer service (themer.sanity.build), with
 * the same slugs and hues:
 *
 * ```ts
 * import {createTheme, getPreset} from '@sanity/themer/legacy'
 *
 * const theme = createTheme(getPreset('verdant').hues)
 * ```
 *
 * @public
 */
export const presets: ThemePreset[] = [
  defaultPreset,
  definePreset(
    'dew',
    'Dew',
    'default=5e63b4;600;lightest:fcfcfd;darkest:0d0d15&primary=d1a308;400;lightest:fcfcfd;darkest:0d0d15&transparent=6c6fa7;500;lightest:fcfcfd;darkest:0d0d15&positive=43D675;300;lightest:fcfcfd;darkest:0d0d15&caution=fb9f24;400;lightest:fcfcfd;darkest:0d0d15&critical=F03E2F;500;lightest:fcfcfd;darkest:0d0d15',
  ),
  definePreset(
    'pink-synth',
    'Pink Synth',
    'lightest=f7f2f5&darkest=171721&default=8b6584&primary=ec4899&transparent=503a4c&positive=10b981&caution=fde047;300&critical=fe3459',
  ),
  definePreset(
    'pixel-art',
    'Pixel Art',
    'default=57619c;600&primary=f10784&transparent=5b6498;600&positive=43d675;300&caution=fbd024;200&lightest=fcfcfd&darkest=0d0e15',
  ),
  definePreset(
    'retro-colonial',
    'Retro Colonial',
    'default=8bb9b5;400&primary=fa7a78;400&transparent=8bb9b5;400&positive=43d675;300&caution=fbd024;200&critical=f02f53&lightest=fcfdfd&darkest=0d1515',
  ),
  definePreset(
    'rosabel',
    'Rosabel',
    'default=9d8966&primary=ed2555;700&transparent=9d8966&positive=43d675;300&caution=fbd024;200&lightest=fdfdfc&darkest=15120d',
  ),
  definePreset(
    'stereofidelic',
    'Stereofidelic',
    'default=678e9a&primary=f13009&transparent=678e9a&positive=43d675;300&caution=fbd024;200&critical=f02f35&lightest=fcfdfd&darkest=0e1315',
  ),
  definePreset(
    'tw-cyan',
    'Tailwind Cyan',
    'default=677389;500;lightest:f9fafb;darkest:101728&primary=51b4d0;500;lightest:effefe;darkest:264d61&transparent=6b727f;500;lightest:f8fafb;darkest:131826&positive=55b785;500;lightest:eefdf5;darkest:214d3b&caution=e2b53e;500;lightest:fefbea;darkest:69411b&critical=e14f62;500;lightest:fdf2f2;darkest:7d2037',
  ),
  definePreset(
    'verdant',
    'Verdant',
    'default=5c9199;500;lightest:fcfdfd;darkest:0d1415&primary=1cb485;400;lightest:fcfdfd;darkest:0d1415&transparent=5c9199;500;lightest:fcfdfd;darkest:0d1415&positive=43D675;300;lightest:fcfdfd;darkest:0d1415&caution=FBD024;200;lightest:fcfdfd;darkest:0d1415&critical=F03E2F;500;lightest:fcfdfd;darkest:0d1415',
  ),
]

/**
 * Finds a preset by its slug, falling back to the default Studio preset for
 * unknown slugs — the same behavior as the hosted Themer service.
 *
 * @public
 */
export function getPreset(slug: string | null | undefined): ThemePreset {
  const needle = slug?.toLowerCase()
  const match = presets.find((preset) => preset.slug === needle)
  if (match) return match
  return defaultPreset
}
