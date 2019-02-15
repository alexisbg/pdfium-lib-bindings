module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    //"jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    // ESLint core rules
    "arrow-parens": "error",
    "eol-last": "error",
    "eqeqeq": ["error", "smart"],
    "indent": 0, //required by @typescript-eslint/indent
    "key-spacing": "error",
    "keyword-spacing": "error",
    "linebreak-style": ["error", "unix"],
    "no-cond-assign": 0,
    "no-constant-condition": 0,
    "no-multi-spaces": "error",
    "no-trailing-spaces": "error",
    "no-unused-vars": 0, //required by @typescript-eslint/no-unused-vars
    "object-curly-spacing": ["error", "always"],
    "prefer-const": "error",
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "strict": "error",

    // @typescript-eslint rules
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-type-alias": ["error", {
      "allowAliases": "in-unions-and-intersections"
    }],
    "@typescript-eslint/no-use-before-define": ["error", {
      "functions": false, "classes": false
    }],
  },
  // "overrides": [
  //   {
  //     "files": ["dist/**/*"],
  //     "rules": {
  //       "@typescript-eslint/camelcase": 0,
  //       "@typescript-eslint/indent": 0,
  //       "@typescript-eslint/no-empty-interface": 0,
  //     }
  //   }
  // ]
};
