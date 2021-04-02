module.exports = {
  extends: ['airbnb-typescript/base', 'prettier/@typescript-eslint'],
  parserOptions: {
    project: ['./packages/**/tsconfig-build.json'],
  },
  ignorePatterns: ['.eslintrc.js', 'lint-staged.config.js', 'commitlint.config.js'],
  rules: {
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'class-methods-use-this': 'off',
    'arrow-parens': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
