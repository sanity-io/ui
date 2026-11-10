# Setting up Sanity UI 5

Read this file when you create a project, fix an unstyled page, fix a build error, or check versions.

## Contents

- Requirements
- Fast path: the setup CLI
- Install by hand
- The entry file
- Project files
- Check what your copy exports
- Common failures

## Requirements

| Need                | Value                                                       |
| ------------------- | ----------------------------------------------------------- |
| React and React DOM | `^19.2`                                                     |
| Node                | `>=20.19 <22` or `>=22.12` (22.0 to 22.11 is not supported) |
| TypeScript          | 5 or later, with `"moduleResolution": "bundler"`            |
| `@sanity/icons`     | 5.2.1 or later                                              |

`@sanity/icons` and `react-refractor` install on their own as dependencies of `@sanity/ui`. Add `@sanity/icons` to your own `package.json` only when your code imports icons.

## Fast path: the setup CLI

The package ships a setup CLI. It writes the dependencies, the stylesheet import, and `tsconfig.json`.

```sh
npx sanity-ui doctor                 # check the project and list fixes
```

Flags: `--dry` (print the plan only), `--yes` or `-y` (accept every default), `--cwd <dir>` (run in another folder).

Run `doctor` before you inspect an entry file by hand. It checks the stylesheet import, `tsconfig.json`, the install state of the packages, and the React and Node versions in one pass.

## Install by hand

Install the v5 line with the `alpha` tag, or with the exact version you were given.

```sh
npm install @sanity/ui@alpha @sanity/icons
```

Never install the bare name `@sanity/ui`. Its `latest` tag points to the UI 4 line, and it resolves to the wrong major with no error.

For a React 18 project, add overrides to `package.json` before you install:

```json
{"overrides": {"react": "^19.2", "react-dom": "^19.2"}}
```

Use `--legacy-peer-deps` only when overrides are not an option. A bare install in a React 18 project fails with `ERESOLVE`.

Add these to `devDependencies`: `typescript`, `@types/react`, `@types/react-dom`, and in a Vite project `@vitejs/plugin-react`.

## The entry file

Put both imports in the app's entry file, the polyfills first.

```tsx
import '@sanity/ui/polyfills'
import '@sanity/ui/styles.css'
```

Each line has a job:

- **The stylesheet is required.** Without it every component renders as plain HTML, and nothing reports an error.
- **The polyfills are required for Tooltip and Dialog.** Tooltips never show in browsers without the Interest Invokers API. A Dialog backdrop click stops closing the dialog in Safari. Escape and the close button still work.
- **The stylesheet goes before your own CSS.** Sanity UI puts only its global reset in a cascade layer, `sui.global`. Your CSS overrides the reset. Component styles are not layered. At equal specificity, the stylesheet imported later wins.

Write the path as `@sanity/ui/styles.css`. The forms `@sanity/ui/dist/styles.css` and `@sanity/ui/styles` fail at the dev server. The page never renders and no console error explains why.

Set `lang="en"` on the `<html>` element in `index.html`.

v5 needs no provider. There is no `ThemeProvider`.

## Project files

For a new Vite project, start from these files.

`package.json`

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build"
  },
  "dependencies": {
    "react": "^19.2",
    "react-dom": "^19.2",
    "@sanity/ui": "alpha",
    "@sanity/icons": "^5.2.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "vite": "^6",
    "@vitejs/plugin-react": "^4",
    "@types/react": "^19",
    "@types/react-dom": "^19"
  }
}
```

`vite.config.ts`

```ts
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

`tsconfig.json`: write it first, as written. It is the file the CLI writes.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force"
  },
  "include": ["src", "app"]
}
```

Rules for this file:

- Keep `"jsx": "react-jsx"`. Without it, every component fails with `TS17004`.
- Keep `"app"` in `include`, even with no `app` folder. A missing folder is not an error while `src` has files.
- Add no other `compilerOptions` keys. An unknown key fails the build with `TS5023`.
- Do not change the file to fix a build. The cause is usually in `src/`.
- Do not run a bare `tsc`. The config has no `noEmit`. It writes `.js` files beside your sources, and Vite loads those. Type-check with `tsc --noEmit`.

Other toolchains, such as Next.js or Remix, keep their own `tsconfig.json`. The two imports still go in the app's entry file.

## Check what your copy exports

The docs can describe components your installed copy does not export yet. List the real exports:

```sh
node -e "console.log(Object.keys(require('@sanity/ui')))"
```

To check an export, run `node -e "console.log(Object.keys(require('@sanity/ui')))"` in the project. The list is the installed package's export list. If a doc and the package disagree, the package wins.

## Common failures

| Symptom                                        | Cause                          | Fix                                                |
| ---------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| Page renders as plain HTML, no error           | Missing `styles.css` import    | Add both entry imports                             |
| Dev server fails and the page never renders    | Wrong stylesheet path          | Use `@sanity/ui/styles.css`                        |
| Tooltip never appears                          | Missing polyfills import       | Import `@sanity/ui/polyfills` above the stylesheet |
| `TS17004` on every component                   | Missing `"jsx": "react-jsx"`   | Restore the `tsconfig.json` above                  |
| `TS7016` for `react`                           | Missing `@types/react`         | Add `@types/react` and `@types/react-dom`          |
| `TS5023: Unknown compiler option`              | Invented `compilerOptions` key | Remove it                                          |
| `ERR_MODULE_NOT_FOUND` on `dev`                | Missing `@vitejs/plugin-react` | Add it to `devDependencies`                        |
| `ERESOLVE` on install                          | React 18 project               | Add overrides, or `--legacy-peer-deps`             |
| `.js` files appear beside `.tsx` files         | Bare `tsc`                     | Delete them, then run `tsc --noEmit`               |
| Icon import passes `tsc`, fails in the browser | Import from the package root   | Import from `@sanity/icons/<Name>`                 |
| Component imports fail as unavailable          | Component is not exported yet  | See `components.md`                                |
