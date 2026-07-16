import {API_SYMBOL_PROJECTION} from '../api'

export const TARGET_PROJECTION = `// groq
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
