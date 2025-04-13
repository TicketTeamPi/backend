import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    overrides: {
      'style/semi': ['error', 'always'],
      'style/brace-style': ['error', '1tbs'],
      'curly': ['error', 'all'],
      'style/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'comma',
            requireLast: true,
          },
          overrides: {
            interface: {
              multiline: {
                delimiter: 'semi',
                requireLast: true,
              },
            },
          },
        },
      ],
    },
  },
  javascript: {
    overrides: {
      'new-cap': 'off',
      'yoda': 'error',
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-unneeded-ternary': 'error',
      'no-empty': 'error',
    },
  },
  jsonc: false,
  yaml: false,
  ignores: ['./node_modules', './build', './dist'],
  rules: {
    'style/max-len': ['error', { code: 120 }],
    'no-unused-private-class-members': 'warn',
    'no-eq-null': 'error',
    'max-classes-per-file': ['error', 1],
    'no-undefined': 'warn',
    'require-await': 'error',
    'require-atomic-updates': 'error',
    'ts/array-type': ['error', { default: 'generic' }],
    'ts/no-namespace': 'off',
    'ts/consistent-type-imports': 'off',
    'ts/consistent-type-definitions': 'off',
  },
});
