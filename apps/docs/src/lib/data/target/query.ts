import groq from 'groq'

import {API_SYMBOL_PROJECTION} from '../api'

export const TARGET_PROJECTION = groq`
...,
content[]{
  ...,

  // expand inline symbol
  children[]{
    _type == 'symbol' => @->{
      _type,
      "member": *[_type in $memberTypes && package._ref == ^.package._ref && name == ^.name]{
        ${API_SYMBOL_PROJECTION}
      }[0]
    },
    _type != 'symbol' => @
  },

  // expand symbol mark
  markDefs[]{
    _type == 'internalLink' => {
      _key,
      _type,
      "targetId": reference._ref
    },
    _type == 'symbol' => @->{
      "_key": ^._key,
      _type,
      "member": *[_type in $memberTypes && package._ref == ^.package._ref && name == ^.name]{
        ${API_SYMBOL_PROJECTION}
      }[0]
    },
    _type != 'internalLink' && _type != 'symbol' => @
  },

  // expand "symbol"
  symbol->{
    _type,
    "member": *[_type in $memberTypes && package._ref == ^.package._ref && name == ^.name]{
      ${API_SYMBOL_PROJECTION}
    }[0]
  }
}
`

// export const TARGET_QUERY = groq`*[_id == $id]{${TARGET_PROJECTION}}[0]`;

export const TARGET_QUERY = groq`
*[_type == "nav" && id == "main"][0]{
  'child': items[segment == $path[0]][0]{
    length($path) == 1 => {target},
    'child': items[defined($path[1]) && segment == $path[1]][0]{
      length($path) == 2 => {target},
      'child': items[defined($path[2]) && segment == $path[2]][0]{
        length($path) == 3 => {target},
        'child': items[defined($path[3]) && segment == $path[3]][0]{
          length($path) == 4 => {target},
        }
      }
    }
  }
}{
  length($path) == 1 => child,
  length($path) == 2 => child.child,
  length($path) == 3 => child.child.child,
  length($path) == 4 => child.child.child.child,
}{target->{${TARGET_PROJECTION}}}.target
`
