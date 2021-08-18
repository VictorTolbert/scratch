# Readme

## Webpack is now v5

- https://webpack.js.org/migrate/5/

## Bootstrap is now version 5

- https://getbootstrap.com/docs/5.0/migration/ "Bootstrap migration guide"

## TS Lint is Deprecated

- https://github.com/palantir/tslint#tslint "GitHub Project Read Me"
- https://blog.palantir.com/tslint-in-2019-1a144c2317a9 "Blog Post"

- `eslint`: The core ESLint linting library
- `@typescript-eslint/parser`: The parser that will allow ESLint to lint TypeScript code
- `@typescript-eslint/eslint-plugin`: A plugin that contains a bunch of ESLint rules that are TypeScript specific

## `.eslintrc.js`

```js
module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
 parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  rules:  {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
};
```

- `prettier`: The core prettier library
- `eslint-config-prettier`: Disables ESLint rules that might conflict with prettier
- `eslint-plugin-prettier`: Runs prettier as an ESLint rule

## `.prettierrc.js`

```js
module.exports =  {
  semi:  true,
  trailingComma:  'all',
  singleQuote:  true,
  printWidth:  120,
  tabWidth:  4,
};
```

## `.eslintrc.js`

```js
module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
};
```
