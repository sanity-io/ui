# @sanity/color

The Sanity color palette.

```sh
npm install @sanity/color
```

[![npm version](https://img.shields.io/npm/v/@sanity/color.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/color)

## Development

```bash
npm run dev
```

Open http://localhost:1234 to see color palette with live reloading. Click a color to copy its hex value. Releases will be published on Vercel.

## Usage

```js
import {color, COLOR_HUES, COLOR_TINTS} from '@sanity/color'

console.log(color.black.title)
// "Black"

console.log(color.black.hex)
// "#101112"

console.log(color.red['500'].title)
// "Red 500"

console.log(color.red['500'].hex)
// "#f03E2f"

console.log(COLOR_HUES)
// ["gray", "blue", "purple", "magenta", "red", "orange", "yellow", "green", "cyan"]

console.log(COLOR_TINTS)
// ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
```

## License

MIT-licensed. See LICENSE.
