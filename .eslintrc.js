module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "jasmine" : true,
      "node"    : true,
      "shared-node-browser" : true,
      "mocha" : true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "jsx": true
      },
      "sourceType": "module",
  },
  "plugins": [
      "react"
  ],
  "rules": {
      "no-console" : 0,
      "no-empty" : 0,
      "linebreak-style": [
          "error",
          "unix"
      ],
      "semi": [
          "error",
          "always"
      ]
  },
  "globals" : {
      "console" : true
  }
};