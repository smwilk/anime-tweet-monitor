module.exports = {
    "extends": [
        "plugin:vue/vue3-recommended",
        "eslint:recommended"
    ],
    "parserOptions": {
      "ecmaVersion": 2020,
      "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
      "indent": [
        "warn",
        2,
      ],
      "quotes": [
          "warn",
          "double"
      ],
      "linebreak-style": [
          "warn",
          "unix"
      ],
      "semi": [
          "warn",
          "never"
      ]
    },
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    }
};