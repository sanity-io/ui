# Contributing to Sanity Design System

## Getting started

```sh
# clone and install dependencies
git clone git@github.com:sanity-io/design.git
cd design
yarn

# To run the ui-storybook dev server
yarn dev:storybook

# To run the ui-docs dev server
yarn dev:docs

# To run all servers
yarn dev
```

## Testing

There are currently no unit tests or integration tests, although there are checks to lint and type check the source code.

```sh
yarn lint
yarn type-check
```

## Git workflow

Create a branch for your task, and send a pull request (PR) to `next` when you want your work reviewed and merged/rebased.

If you’re adding an urgent bug fix, then code review is not required.

* The `main` branch is the released branch
* The `next` branch is the development branch

## Publishing

To release updated packages, run this command:

```sh
yarn release
```
