module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parseOptions: {
        exmaVersion: 2018,
        sourceType: "module"
    },
    rules: {}
}