import groq from 'groq'

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
}{target->}.target
`
