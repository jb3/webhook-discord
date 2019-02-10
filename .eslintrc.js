module.exports = {
    extends: 'eslint:recommended',
    env: {
        node: true,
        es6: true 
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
        'no-console': 'off',
        'no-unused-vars': 'off',
        'block-scoped-var': 'error',
        'curly': ['error', 'multi-line'],
        'no-empty-function': 'off',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-useless-return': 'off',
        'semi': 'error'
    }
};