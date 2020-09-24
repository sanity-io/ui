# Contributing to Sanity Design System

## Getting started

```sh
# clone and install dependencies
git clone git@github.com:sanity-io/ui.git
cd ui
npm install

# To run the ui-storybook dev server
npm run dev:storybook

# To run the ui-docs dev server
npm run dev:docs

# To run all servers
npm run dev
```

## Testing

There are currently no unit tests or integration tests, although there are checks to lint and type check the source code.

```sh
npm run lint
npm run type-check
```

## Git workflow

Create a branch for your task, and send a pull request (PR) to `next` when you want your work reviewed and merged/rebased.

If you’re adding an urgent bug fix, then code review is not required.

* The `main` branch is the released branch
* The `next` branch is the development branch

## Publishing

TBD.
