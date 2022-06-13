# Mercado Libre challenge front end

## Getting Started

First, we need to install dependencies:

```bash
yarn install
```

To run development server:

```bash
yarn dev
```

## Unit tests

Test are using Jest and React Testing Library.
If you want to run the unit tests:

```bash
yarn test
```

If you want to see tests coverage

```bash
yarn test -- --coverage
```

You should see something like this:

```
------------------------------|---------|----------|---------|---------|-------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------|---------|----------|---------|---------|-------------------
All files                     |     100 |      100 |     100 |     100 |
 components/itemCard          |     100 |      100 |     100 |     100 |
  itemCard.tsx                |     100 |      100 |     100 |     100 |
 components/itemDetails       |     100 |      100 |     100 |     100 |
  itemDetails.tsx             |     100 |      100 |     100 |     100 |
 components/itemsLayout       |     100 |      100 |     100 |     100 |
  itemsLayout.tsx             |     100 |      100 |     100 |     100 |
 components/navbar            |     100 |      100 |     100 |     100 |
  navbar.tsx                  |     100 |      100 |     100 |     100 |
 components/shared/breadcrumb |     100 |      100 |     100 |     100 |
  breadcrumb.tsx              |     100 |      100 |     100 |     100 |
 components/shared/searchBar  |     100 |      100 |     100 |     100 |
  searchBar.tsx               |     100 |      100 |     100 |     100 |
 pages/items                  |     100 |      100 |     100 |     100 |
  [id].tsx                    |     100 |      100 |     100 |     100 |
  index.tsx                   |     100 |      100 |     100 |     100 |
------------------------------|---------|----------|---------|---------|-------------------
```

## E2E tests

Currently using Playwright for e2e tests. They are running in three browsers: Chrome, Firefox, Safari. You may need to install supported browsers first.

```bash
npx playwright install
```

If you want to run the tests first you need to have the app running and from another console run:

```bash
yarn test:e2e
```
