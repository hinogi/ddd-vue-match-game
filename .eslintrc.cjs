/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    plugins: ['@typescript-eslint', 'vue', 'eslint-plugin-vue-pug'],
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        'plugin:vue-pug/vue3-recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    rules: {
        quotes: ['error', 'single'],
        'vue/html-indent': ['error', 4],
        'vue/multi-word-component-names': 0,
        '@typescript-eslint/indent': ['error', 4],
        'vue/no-multiple-template-root': 0,
        'vue/valid-template-root': 0,
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
};
