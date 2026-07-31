# @sanity-labs/ui-poc

## 0.0.1-alpha.25

### Patch Changes

- 92a9bc6: add init and doctor cli commands
- 0c0ef8f: add node-safe shim for styles.css export

## 0.0.1-alpha.24

### Patch Changes

- 2313b23: update component types to include defaults for generic as props

## 0.0.1-alpha.23

### Patch Changes

- 8eec624: switch container contentSize to size and skipToContent hash to href
- 2100631: chore: export empty types module for styles.css
- 941e471: - support conditional prop defs
  - add eyebrow component
  - rename typography lineClamp prop to truncate, make align and truncate responsive
- 8531e04: re-export types

## 0.0.1-alpha.22

### Patch Changes

- dc46671: fix: update web font source URLs

## 0.0.1-alpha.21

### Patch Changes

- build all components as client components

## 0.0.1-alpha.20

### Patch Changes

- e444c47: feat!: remove cascade layers and revert to import order for managing specificity resolution

## 0.0.1-alpha.19

### Patch Changes

- 2eff581: fix: add new top level `sui` CSS layer to avoid layer collisions w/ other stylesheets

## 0.0.1-alpha.18

### Patch Changes

- 1844a8b: postfix classnames with version number for version scoping
- 4004f1c: Move `@sanity/icons` and `react-refractor` from `peerDependencies` to `dependencies` so consumers no longer get peer dependency warnings on npm/yarn/bun. Only `react` and `react-dom` remain peer dependencies.
- feeb157: switch from classnames to clsx
- 335e478: - migrate to @sanity/pkg-utils v10 (consumed via the pnpm catalog)
  - enable React Compiler in the build (target React 19)

## 0.0.1-alpha.17

### Patch Changes

- 5a0d129: fixes issues w/ codemods and browserslist config

## 0.0.1-alpha.16

### Patch Changes

- c63061c: add press area component

## 0.0.1-alpha.15

### Patch Changes

- ef0e601: add icon button component
- cfd8652: add tooltip and tooltip group components

## 0.0.1-alpha.14

### Patch Changes

- 9d55d1a: add button and spinner components
- 01d6838: add indicator and indicator group components
- 202508a: add list component and item, image, and text subcomponents

## 0.0.1-alpha.13

### Patch Changes

- 6c71932: add vstack, hstack, and inline components
- 683d119: add link and skip to content components

## 0.0.1-alpha.12

### Patch Changes

- be80ab5: - add checkbox, radio, and switch components
  - minor css improvements

## 0.0.1-alpha.11

### Patch Changes

- c84e2fb: - add code, container, and icon components
  - use css layers and minify in prod
