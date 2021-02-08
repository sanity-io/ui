# Contributing to Sanity Design

## Getting started

```sh
# Clone and install dependencies
git clone git@github.com:sanity-io/design.git
cd design
yarn

# Run the docs dev servers (Studio and Next.js apps)
yarn dev:docs

# Run the Studio example
yarn dev:example-studio

# Run the Manage example
yarn dev:manage-studio

# Run the Storybook dev server
yarn dev:storybook

# Run all servers
yarn dev
```

## Testing

```sh
yarn lint
yarn type-check
yarn test
```

## Browser testing

```sh
yarn test:browser
```

## Performance testing

```sh
yarn test:perf
```

## Git workflow

Create a branch for your task, and send a pull request (PR) to `next` when you want your work reviewed and merged/rebased.

If you’re adding an urgent bug fix, then code review is not required.

* The `main` branch is the released branch
* The `next` branch is the development branch

## Publishing

To release updated packages, run this command:

```sh
# To publish a new `latest` release
git checkout main
yarn release:latest

# To publish a new `next` release
git checkout next
yarn release:next
```
