module.exports = {
  root: true,
  env: { node: true, es2021: true },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly'
  },
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser' }, // если TS не нужен — убери
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/prettier' // ← ключ к «миру» Prettier 2 + ESLint 7
  ],
  rules: {
    'linebreak-style': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/no-undef-properties': [
      'warn',
      {
        ignores: ['/^\\$/']
      }
    ],
    'vue/no-unused-properties': [
      'warn',
      {
        groups: ['props'],
        deepData: false,
        ignorePublicMembers: false,
        unreferencedOptions: []
      }
    ],
    'vue/no-undef-components': [
      'error',
      {
        ignorePatterns: [
          'router-link',
          'router-view',
          'notification',
          'notification-group',
          'google-login'
        ]
      }
    ],
    'vue/valid-v-on': 'warn',
    'prettier/prettier': 'error',
    'vue/no-multiple-template-root': 'off',
    'no-return-await': 'warn',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true
      }
    ]
  }
}
