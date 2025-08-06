import {writeFile} from 'fs/promises'
import path from 'path'

const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/.workshop/main.tsx"></script>
  </body>
</html>
`

export async function _writeHTML(options: {outDir: string}): Promise<void> {
  await writeFile(path.resolve(options.outDir, 'index.html'), HTML)
}
